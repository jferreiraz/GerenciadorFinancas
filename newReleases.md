Em app.json alterar:
    version: 1.0.1 -> adicionar +1
    versionCode: 2 -> adicionar +1


Terminal:

    Código para gerar atualização do expo: 
    eas build --platform android

    Código para enviar atualização ao google play console: 
    eas submit -p android --latest

