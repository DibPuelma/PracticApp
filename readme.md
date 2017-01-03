## Instalar Proyecto
1. Instalar Android Studio para obtener el Android SDK y AVD
2. Instalar Android 6.0 (23.0.1)

```
Preferences → Appearance & Behavior → System Settings → Android SDK.
```

En la esquina inferior derecha seleccionar "Show Package Details". Luego marcar (si no están marcadas):
  
- Android 6.0 (Marshmallow)  
  - Google APIs
  - Intel x86 Atom System Image
  - Intel x86 Atom_64 System Image
  - Google APIs Intel x86 Atom_64 System Image

Click en Apply para instalar los paquetes.

3. Instalar React Native (como root):
```
npm install -g react-native-cli
```

4. Clonar proyecto
```
git clone https://famunoz13@bitbucket.org/famunoz13/practica.git
```

5. Correr proyecto
```
cd proyecto
react-native run-android
```

6. Referencias:
- <https://facebook.github.io/react-native/docs/getting-started.html>
- <https://facebook.github.io/react-native/releases/0.34/docs/getting-started.html>


