function loadStream() {
    const url = document.getElementById('stream-url').value;
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = '<video id="video" controls></video>';
    const video = document.getElementById('video');
    
    if (Hls.isSupported()) {
        var config = {
            xhrSetup: function (xhr, url) {
                xhr.withCredentials = true; // do send cookies
                url = url + '?t=' + new Date().getTime();
                xhr.open('GET', url, true);
            }
        };

        const hls = new Hls(config);
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
            video.play();
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('loadedmetadata', function() {
            video.play();
        });
    } else {
        console.log('Unsupported video format or link. Please check the URL.');
        alert('Unsupported video format or link. Please check the URL.');
    }
}
