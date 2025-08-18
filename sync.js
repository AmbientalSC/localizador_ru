// Script único para validar e atualizar automaticamente
const fs = require('fs');
const path = require('path');

// Importar funções dos outros scripts
const { execSync } = require('child_process');

function runScript(scriptName, description) {
    console.log(`\n🔄 ${description}...`);
    try {
        execSync(`node ${scriptName}`, { stdio: 'inherit' });
        console.log(`✅ ${description} concluído!`);
        return true;
    } catch (error) {
        console.error(`❌ Erro em ${description}:`, error.message);
        return false;
    }
}

function main() {
    console.log('=== Script Único de Manutenção GeoJSON ===');
    console.log('Este script vai validar e atualizar automaticamente.\n');
    
    let success = true;
    
    // 1. Validar arquivos
    success = runScript('validateGeoJSON.js', 'Validando arquivos GeoJSON') && success;
    
    // 2. Atualizar lista
    success = runScript('updateGeoJsonList.js', 'Atualizando lista de arquivos') && success;
    
    console.log('\n=== Resultado Final ===');
    if (success) {
        console.log('✅ Tudo pronto! Seus arquivos GeoJSON estão validados e atualizados.');
        console.log('\n📝 Próximos passos:');
        console.log('1. Teste o site para verificar se tudo carrega corretamente');
        console.log('2. Faça commit das alterações se estiver satisfeito');
    } else {
        console.log('⚠️ Alguns problemas foram encontrados. Verifique os logs acima.');
    }
}

main();
