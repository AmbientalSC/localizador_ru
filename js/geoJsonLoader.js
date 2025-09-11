// Função para carregar e combinar todos os arquivos GeoJSON automaticamente
(async function loadAndCombineGeoJSONs() {
    // Lista de arquivos GeoJSON disponíveis na pasta data/ (atualizada automaticamente)
    const geoJsonFiles = [
        "domiciliar_abelardo_luz.geojson",
        "domiciliar_bc_bt.geojson",
        "domiciliar_camboriu.geojson",
        "domiciliar_campo_ere.geojson",
        "domiciliar_chapeco.geojson",
        "domiciliar_coronel_freitas.geojson",
        "domiciliar_erval_velho.geojson",
        "domiciliar_itajai.geojson",
        "domiciliar_itapema.geojson",
        "domiciliar_itapema_bt.geojson",
        "domiciliar_jaragua_do_sul.geojson",
        "domiciliar_joinville.geojson",
        "domiciliar_rio_do_sul.geojson",
        "domiciliar_santa_cecilia.geojson",
        "domiciliar_sao_jose.geojson",
        "domiciliar_sfs.geojson",
        "domiciliar_xanxere.geojson",
        "seletiva_bc.geojson",
        "seletiva_camboriu.geojson",
        "seletiva_chapeco.geojson",
        "seletiva_itajai.geojson",
        "seletiva_itapema.geojson",
        "seletiva_jaragua_do_sul.geojson",
        "seletiva_joinville.geojson",
        "seletiva_rio_do_sul.geojson",
        "seletiva_sao_jose.geojson",
        "seletiva_sfs.geojson",
        "volumosos_bc.geojson"
];

    let combinedFeatures = [];

    // Função para carregar um arquivo GeoJSON
    async function loadGeoJSON(filename) {
        try {
            const response = await fetch(`./data/${filename}`);
            if (!response.ok) {
                console.warn(`Não foi possível carregar o arquivo ${filename}: ${response.statusText}`);
                return null;
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Erro ao carregar ${filename}:`, error);
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

    console.log(`GeoJSON combinado criado com ${combinedFeatures.length} features totais`);

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
}