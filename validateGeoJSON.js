// Script para validar e corrigir arquivos GeoJSON
const fs = require('fs');
const path = require('path');

function validateAndFixGeoJSON(filePath) {
    console.log(`\n=== Validando ${path.basename(filePath)} ===`);
    
    try {
        // Ler o arquivo como texto
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Verificar e corrigir caracteres problemáticos comuns
        const originalLength = content.length;
        
        // Substituir caracteres Unicode problemáticos
        content = content.replace(/[\u2013\u2014]/g, '-'); // traços longos (en-dash, em-dash)
        content = content.replace(/[\u201C\u201D]/g, '"'); // aspas duplas curvas
        content = content.replace(/[\u2018\u2019]/g, "'"); // aspas simples curvas
        content = content.replace(/[\u00A0]/g, ' '); // espaços não-quebráveis
        content = content.replace(/[\u200B-\u200D\uFEFF]/g, ''); // zero-width characters
        
        // Remover caracteres de controle invisíveis
        content = content.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
        
        // Normalizar quebras de linha
        content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        
        // Corrigir vírgulas duplas ou vírgulas seguidas de fechamento de chave/colchete
        content = content.replace(/,\s*,/g, ','); // vírgulas duplas
        content = content.replace(/,(\s*[}\]])/g, '$1'); // vírgula antes de fechar
        
        if (content.length !== originalLength) {
            console.log('   ✓ Caracteres Unicode problemáticos corrigidos');
        }
        
        // Tentar fazer o parse do JSON
        const data = JSON.parse(content);
        
        // Validar estrutura GeoJSON
        if (data.type !== 'FeatureCollection') {
            throw new Error(`Tipo inválido: ${data.type}. Esperado: FeatureCollection`);
        }
        
        if (!Array.isArray(data.features)) {
            throw new Error('Propriedade "features" deve ser um array');
        }
        
        console.log(`   ✓ JSON válido com ${data.features.length} features`);
        
        // Salvar o arquivo corrigido se houver mudanças
        if (content.length !== originalLength) {
            const backupPath = filePath + '.backup';
            fs.writeFileSync(backupPath, fs.readFileSync(filePath));
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`   ✓ Arquivo corrigido (backup salvo como ${path.basename(backupPath)})`);
        }
        
        return { success: true, features: data.features.length };
        
    } catch (error) {
        console.error(`   ✗ Erro: ${error.message}`);
        
        // Tentativa de correção mais agressiva
        console.log('   🔧 Tentando correção automática...');
        
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Correções mais agressivas
            content = content.replace(/[\u2013\u2014]/g, '-'); // traços longos
            content = content.replace(/[\u201C\u201D]/g, '"'); // aspas duplas curvas
            content = content.replace(/[\u2018\u2019]/g, "'"); // aspas simples curvas
            content = content.replace(/[\u00A0]/g, ' '); // espaços não-quebráveis
            content = content.replace(/[\u200B-\u200D\uFEFF]/g, ''); // zero-width characters
            content = content.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ''); // caracteres de controle
            
            // Normalizar quebras de linha
            content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
            
            // Corrigir problemas de vírgulas
            content = content.replace(/,\s*,/g, ','); // vírgulas duplas
            content = content.replace(/,(\s*[}\]])/g, '$1'); // vírgula antes de fechar
            
            // Tentar parse novamente
            const data = JSON.parse(content);
            
            // Se chegou aqui, a correção funcionou
            console.log('   ✅ Correção automática bem-sucedida!');
            
            // Salvar backup e arquivo corrigido
            const backupPath = filePath + '.backup';
            fs.writeFileSync(backupPath, fs.readFileSync(filePath));
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`   ✓ Arquivo corrigido (backup: ${path.basename(backupPath)})`);
            
            // Validar estrutura
            if (data.type !== 'FeatureCollection') {
                throw new Error(`Tipo inválido: ${data.type}. Esperado: FeatureCollection`);
            }
            
            if (!Array.isArray(data.features)) {
                throw new Error('Propriedade "features" deve ser um array');
            }
            
            console.log(`   ✓ JSON válido com ${data.features.length} features`);
            return { success: true, features: data.features.length };
            
        } catch (secondError) {
            console.error(`   ✗ Correção automática falhou: ${secondError.message}`);
            
            // Tentar identificar a posição do erro
            if (error.message.includes('position')) {
                const match = error.message.match(/position (\d+)/);
                if (match) {
                    const position = parseInt(match[1]);
                    const content = fs.readFileSync(filePath, 'utf8');
                    const lines = content.substring(0, position).split('\n');
                    const lineNumber = lines.length;
                    const columnNumber = lines[lines.length - 1].length + 1;
                    console.error(`   ✗ Erro na linha ${lineNumber}, coluna ${columnNumber}`);
                    
                    // Mostrar contexto do erro
                    const allLines = content.split('\n');
                    const start = Math.max(0, lineNumber - 3);
                    const end = Math.min(allLines.length, lineNumber + 2);
                    
                    console.log('\n   Contexto do erro:');
                    for (let i = start; i < end; i++) {
                        const marker = i === lineNumber - 1 ? ' >>> ' : '     ';
                        console.log(`${marker}${i + 1}: ${allLines[i]}`);
                    }
                }
            }
            
            return { success: false, error: secondError.message };
        }
    }
}

// Processar todos os arquivos GeoJSON
function processAllGeoJSONFiles() {
    const dataDir = path.join(__dirname, 'data');
    const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.geojson'));
    
    console.log('=== Validador de Arquivos GeoJSON ===');
    console.log(`Encontrados ${files.length} arquivos GeoJSON na pasta data/`);
    
    let totalFeatures = 0;
    let successCount = 0;
    
    files.forEach(file => {
        const filePath = path.join(dataDir, file);
        const result = validateAndFixGeoJSON(filePath);
        
        if (result.success) {
            successCount++;
            totalFeatures += result.features;
        }
    });
    
    console.log(`\n=== Resumo ===`);
    console.log(`Arquivos processados: ${files.length}`);
    console.log(`Arquivos válidos: ${successCount}`);
    console.log(`Total de features: ${totalFeatures}`);
    
    if (successCount === files.length) {
        console.log('✓ Todos os arquivos estão válidos!');
    } else {
        console.log('⚠ Alguns arquivos precisam de correção manual');
    }
}

// Executar o script
processAllGeoJSONFiles();
