#!/bin/bash

# Script de verificación de autenticación
# Ejecutar: chmod +x scripts/verify-auth.sh && ./scripts/verify-auth.sh

echo "🔐 Verificando sistema de autenticación..."
echo ""

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

BASE_URL="http://localhost:3000"
PASSED=0
FAILED=0

check_response() {
    local test_name=$1
    local url=$2
    local expected_status=$3
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$response" -eq "$expected_status" ]; then
        echo -e "${GREEN}✓${NC} $test_name (Status: $response)"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $test_name (Expected: $expected_status, Got: $response)"
        ((FAILED++))
    fi
}

echo "📋 Verificando rutas públicas..."
check_response "Health endpoint" "$BASE_URL/api/health" 200
check_response "Keep-alive endpoint" "$BASE_URL/api/keep-alive" 200
check_response "Login page" "$BASE_URL/login" 200

echo ""
echo "📋 Verificando rutas protegidas..."
check_response "Home page redirect" "$BASE_URL/" 307

echo ""
echo "📋 Verificando API protegida..."
api_response=$(curl -s "$BASE_URL/api/link-preview?url=https://example.com")
if echo "$api_response" | grep -q "No autenticado"; then
    echo -e "${GREEN}✓${NC} API retorna error de autenticación"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} API no está protegida"
    ((FAILED++))
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "Resultados: ${GREEN}$PASSED pasaron${NC}, ${RED}$FAILED fallaron${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ Todas las verificaciones pasaron${NC}"
    exit 0
else
    echo -e "${RED}✗ Algunas verificaciones fallaron${NC}"
    exit 1
fi
