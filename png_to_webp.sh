#!/bin/bash

# Cores para um feedback visual moderno
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # Sem cor

echo -e "${GREEN}==> Iniciando processo de otimização de imagens...${NC}"

# 1. Instalação do cwebp (WebP tools)
if ! command -v cwebp &> /dev/null; then
    echo "Instalando webp-tools..."
    sudo apt update && sudo apt install -y webp
else
    echo "cwebp já está instalado. Pulando etapa."
fi

TARGET_DIR="./images"

# Verifica se o diretório existe
if [ ! -d "$TARGET_DIR" ]; then
    echo -e "${RED}Erro: Diretório $TARGET_DIR não encontrado.${NC}"
    exit 1
fi

# 2. Transformação e Validação
# Usamos 'find' para lidar com subpastas e nomes de arquivos com espaços
find "$TARGET_DIR" -type f -name "*.png" | while read -r png_file; do
    webp_file="${png_file%.png}.webp"
    
    echo -n "Convertendo: $(basename "$png_file") -> "
    
    # Executa a conversão com qualidade 80
    if cwebp -q 80 "$png_file" -o "$webp_file" -quiet; then
        # 3. Validação e Deletar
        if [ -f "$webp_file" ]; then
            rm "$png_file"
            echo -e "${GREEN}SUCESSO e PNG removido${NC}"
        else
            echo -e "${RED}FALHA (arquivo não gerado)${NC}"
        fi
    else
        echo -e "${RED}FALHA na conversão${NC}"
    fi
done

echo -e "${GREEN}==> Operação finalizada!${NC}"