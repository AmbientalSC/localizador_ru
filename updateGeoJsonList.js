// Script para atualizar automaticamente a lista de arquivos GeoJSON
// Execute este script sempre que adicionar novos arquivos GeoJSON na pasta data/

const fs = require('fs');
const path = require('path');

// Função para descobrir todos os arquivos GeoJSON na pasta data/
function discoverGeoJSONFiles() {
    const dataPath = path.join(__dirname, 'data');
    
    try {
        const files = fs.readdirSync(dataPath);
        const geoJsonFiles = files.filter(file => file.endsWith('.geojson'));
        
        console.log('Arquivos GeoJSON encontrados:');
        geoJsonFiles.forEach((file, index) => {
            console.log(`${index + 1}. ${file}`);
        });
        
        return geoJsonFiles;
    } catch (error) {
        console.error('Erro ao ler a pasta data/:', error);
        return [];
    }
}

// Função para atualizar o arquivo geoJsonLoader.js
function updateGeoJsonLoader(geoJsonFiles) {
    const loaderPath = path.join(__dirname, 'js', 'geoJsonLoader.js');
    
    const updatedContent = `// Função para carregar e combinar todos os arquivos GeoJSON automaticamente
(async function loadAndCombineGeoJSONs() {
    // Lista de arquivos GeoJSON disponíveis na pasta data/ (atualizada automaticamente)
    const geoJsonFiles = ${JSON.stringify(geoJsonFiles, null, 8)};

    let combinedFeatures = [];

    // Função para carregar um arquivo GeoJSON
    async function loadGeoJSON(filename) {
        try {
            const response = await fetch(\`./data/\${filename}\`);
            if (!response.ok) {
                console.warn(\`Não foi possível carregar o arquivo \${filename}: \${response.statusText}\`);
                return null;
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(\`Erro ao carregar \${filename}:\`, error);
            return null;
        }
    }

    // Carregar todos os arquivos GeoJSON em paralelo
    const promises = geoJsonFiles.map(filename => loadGeoJSON(filename));
    const results = await Promise.all(promises);

    // Combinar as features de todos os arquivos carregados
    results.forEach((geoJsonData, index) => {
        if (geoJsonData && geoJsonData.type === 'FeatureCollection' && Array.isArray(geoJsonData.features)) {
            combinedFeatures = combinedFeatures.concat(geoJsonData.features);
        }
    });

    // Criar o objeto GeoJSON combinado
    window.json_Mesclado_1 = {
        type: "FeatureCollection",
        name: "Mesclado_1",
        crs: {
            type: "name",
            properties: {
                name: "urn:ogc:def:crs:OGC:1.3:CRS84"
            }
        },
        features: combinedFeatures
    };

    console.log(\`GeoJSON combinado criado com \${combinedFeatures.length} features totais\`);

    // Disparar evento personalizado para indicar que os dados estão prontos
    window.dispatchEvent(new CustomEvent('geoJsonLoaded'));
})();

// Função para descobrir automaticamente arquivos GeoJSON (alternativa mais dinâmica)
async function autoDiscoverGeoJSONFiles() {
    try {
        // Esta função pode ser expandida para descobrir automaticamente os arquivos
        // Por enquanto, usamos a lista manual acima
        console.log('Descoberta automática de arquivos não implementada. Usando lista manual.');
    } catch (error) {
        console.error('Erro na descoberta automática:', error);
    }
}`;

    try {
        fs.writeFileSync(loaderPath, updatedContent, 'utf8');
        console.log('\\nArquivo geoJsonLoader.js atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar o arquivo geoJsonLoader.js:', error);
    }
}

// Executar o script
console.log('=== Atualizador de Arquivos GeoJSON ===\\n');
const geoJsonFiles = discoverGeoJSONFiles();

if (geoJsonFiles.length > 0) {
    updateGeoJsonLoader(geoJsonFiles);
    console.log('\\n=== Atualização concluída! ===');
    console.log('\\nPara adicionar novos arquivos GeoJSON:');
    console.log('1. Coloque o arquivo .geojson na pasta data/');
    console.log('2. Execute novamente este script: node updateGeoJsonList.js');
    console.log('3. Faça o commit e push das alterações');
} else {
    console.log('\\nNenhum arquivo GeoJSON encontrado na pasta data/');
}
