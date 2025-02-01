class ARButton {
    static createButton(renderer, sessionInit = {}) {
        const button = document.createElement('button');
        
        function showStartAR() {
            button.style.display = '';
            button.style.cursor = 'pointer';
            button.style.left = 'calc(50% - 50px)';
            button.style.width = '100px';
            button.style.position = 'absolute';
            button.style.bottom = '20px';
            button.style.padding = '12px 6px';
            button.style.border = '1px solid #fff';
            button.style.borderRadius = '4px';
            button.style.background = 'rgba(0,0,0,0.1)';
            button.style.color = '#fff';
            button.style.font = 'normal 13px sans-serif';
            button.style.textAlign = 'center';
            button.style.opacity = '0.5';
            button.style.outline = 'none';
            button.style.zIndex = '999';
        }

        function onSessionStarted(session) {
            session.addEventListener('end', onSessionEnded);
            renderer.xr.setSession(session);
            button.textContent = 'EXIT AR';
            currentSession = session;
        }

        function onSessionEnded() {
            currentSession.removeEventListener('end', onSessionEnded);
            button.textContent = 'START AR';
            currentSession = null;
        }

        if ('xr' in navigator) {
            button.textContent = 'START AR';
            button.style.display = 'none';

            navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
                supported ? showStartAR() : null;
            });

            let currentSession = null;
            button.addEventListener('click', () => {
                if (currentSession === null) {
                    navigator.xr.requestSession('immersive-ar', sessionInit).then(onSessionStarted);
                } else {
                    currentSession.end();
                }
            });

            return button;
        } else {
            const message = document.createElement('a');
            message.href = 'https://immersiveweb.dev/';
            message.innerHTML = 'WEBXR NOT AVAILABLE';
            return message;
        }
    }
}

export { ARButton };