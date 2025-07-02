import json

def filtrar_geojson(caminho_entrada, caminho_saida):
    try:

        with open(caminho_entrada, 'r', encoding='utf-8') as f:
            geojson_data = json.load(f)

        if 'features' not in geojson_data:
            print("Erro: O arquivo de entrada não parece ser um GeoJSON com 'features'.")
            return

        features_originais = geojson_data['features']
        
        features_filtradas = []

        for feature in features_originais:
            propriedades = feature.get('properties', {})
            
            operacao = propriedades.get('OPERACAO')
            filial = propriedades.get('FILIAL')

            if operacao == "Seletiva" and filial == "JOINVILLE":
                continue
            else:
                features_filtradas.append(feature)
        
        geojson_data['features'] = features_filtradas

        with open(caminho_saida, 'w', encoding='utf-8') as f:
            json.dump(geojson_data, f, ensure_ascii=False, indent=4)
        
        print(f"Filtro concluído com sucesso!")
        print(f"Features originais: {len(features_originais)}")
        print(f"Features restantes: {len(features_filtradas)}")
        print(f"Resultado salvo em: {caminho_saida}")

    except FileNotFoundError:
        print(f"Erro: O arquivo de entrada '{caminho_entrada}' não foi encontrado.")
    except json.JSONDecodeError:
        print(f"Erro: O arquivo '{caminho_entrada}' não contém um JSON válido.")
    except Exception as e:
        print(f"Ocorreu um erro inesperado: {e}")



arquivo_entrada = r'C:\Users\alysson.krombauer\OneDrive - Ambiental Limpeza Urbana e Saneamento Ltda\Documentos\GitHub\localizador_ru\data\arquivo_filtrado.geojson'

arquivo_saida = 'arquivo_filtrado2.geojson'

if __name__ == "__main__":
    filtrar_geojson(arquivo_entrada, arquivo_saida)
