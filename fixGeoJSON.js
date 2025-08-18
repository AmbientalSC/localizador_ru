const fs = require('fs');
const path = require('path');

function analyzeCharacterAtPosition(filePath, position) {
    const content = fs.readFileSync(filePath, 'utf8');
    const buffer = fs.readFileSync(filePath);
    
    console.log(`\n=== Análise do caractere na posição ${position} ===`);
    
    // Caractere na posição problemática
    const char = content[position];
    const charCode = content.charCodeAt(position);
    const byte = buffer[position];
    
    console.log(`Caractere: "${char}"`);
    console.log(`Código Unicode: ${charCode} (0x${charCode.toString(16)})`);
    console.log(`Byte: ${byte} (0x${byte.toString(16)})`);
    
    // Contexto em torno da posição
    const start = Math.max(0, position - 20);
    const end = Math.min(content.length, position + 20);
    const context = content.substring(start, end);
    
    console.log('\nContexto (20 chars antes e depois):');
    console.log(`"${context}"`);
    
    // Mostrar cada byte do contexto
    console.log('\nBytes do contexto:');
    for (let i = start; i < end; i++) {
        const c = content[i];
        const code = content.charCodeAt(i);
        const marker = i === position ? ' <-- PROBLEMA' : '';
        console.log(`Pos ${i}: "${c}" (${code}/0x${code.toString(16)})${marker}`);
    }
}

function fixGeoJSONFile(filePath) {
    console.log(`\n=== Corrigindo ${path.basename(filePath)} ===`);
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        
        // Log do tamanho original
        console.log(`Tamanho original: ${content.length} caracteres`);
        
        // Várias tentativas de limpeza
        console.log('Aplicando limpezas...');
        
        // 1. Remover BOM se presente
        if (content.charCodeAt(0) === 0xFEFF) {
            content = content.slice(1);
            console.log('  ✓ BOM removido');
        }
        
        // 2. Normalizar quebras de linha
        const beforeLines = content.length;
        content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        if (content.length !== beforeLines) {
            console.log('  ✓ Quebras de linha normalizadas');
        }
        
        // 3. Remover caracteres de controle invisíveis
        const beforeControl = content.length;
        content = content.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
        if (content.length !== beforeControl) {
            console.log('  ✓ Caracteres de controle removidos');
        }
        
        // 4. Remover zero-width characters
        const beforeZero = content.length;
        content = content.replace(/[\u200B-\u200D\uFEFF]/g, '');
        if (content.length !== beforeZero) {
            console.log('  ✓ Caracteres zero-width removidos');
        }
        
        // 5. Substituir caracteres Unicode problemáticos
        const beforeUnicode = content.length;
        content = content.replace(/[\u2013\u2014]/g, '-');
        content = content.replace(/[\u201C\u201D]/g, '"');
        content = content.replace(/[\u2018\u2019]/g, "'");
        content = content.replace(/[\u00A0]/g, ' ');
        if (content.length !== beforeUnicode) {
            console.log('  ✓ Caracteres Unicode problemáticos substituídos');
        }
        
        // 6. Tentar parse
        console.log('Tentando parse do JSON...');
        const data = JSON.parse(content);
        
        console.log(`✅ Sucesso! ${data.features ? data.features.length : 0} features encontradas`);
        
        // Salvar arquivo corrigido
        if (content !== originalContent) {
            const backupPath = filePath + '.backup';
            fs.writeFileSync(backupPath, originalContent);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✓ Arquivo corrigido (backup: ${path.basename(backupPath)})`);
        }
        
        return true;
        
    } catch (error) {
        console.error(`❌ Erro: ${error.message}`);
        
        // Se o erro tem posição, analisar
        if (error.message.includes('position')) {
            const match = error.message.match(/position (\d+)/);
            if (match) {
                const position = parseInt(match[1]);
                analyzeCharacterAtPosition(filePath, position);
            }
        }
        
        return false;
    }
}

// Processar os arquivos
const files = [
    'data/Jaragua RSC.geojson',
    'data/Jaragua RSR.geojson',
    'data/Volumosos.geojson'
];

console.log('=== Corretor Avançado de GeoJSON ===');

files.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
        fixGeoJSONFile(fullPath);
    } else {
        console.log(`❌ Arquivo não encontrado: ${file}`);
    }
});
