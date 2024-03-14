function embedContent() {
    var youtubeLink = document.getElementById('youtubeLink').value;
    var videoContainer = document.getElementById('videoContainer');
    var iframeContainer = document.getElementById('iframeContainer');
    var embedCode = generateEmbedCode(youtubeLink);
    if (youtubeLink.trim() !== '') {
        videoContainer.innerHTML = embedCode;
        iframeContainer.innerHTML = '<textarea rows="3" readonly>' + getIframeLink(youtubeLink) + '</textarea>';
        document.getElementById('copyButton').style.display = 'block';
    } else {
        videoContainer.innerHTML = '';
        iframeContainer.innerHTML = '';
        document.getElementById('copyButton').style.display = 'none';
    }
}

function generateEmbedCode(link) {
    var id = extractVideoID(link);
    if (id) {
        return '<iframe width="100%" height="auto" src="https://www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen></iframe>';
    } else {
        var playlistID = extractPlaylistID(link);
        if (playlistID) {
            return '<iframe width="100%" height="auto" src="https://www.youtube.com/embed/videoseries?list=' + playlistID + '" frameborder="0" allowfullscreen></iframe>';
        } else {
            return 'Invalid YouTube link.';
        }
    }
}

function getIframeLink(link) {
    var id = extractVideoID(link);
    if (id) {
        return '<iframe width="100%" height="auto" src="https://www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen></iframe>';
    } else {
        var playlistID = extractPlaylistID(link);
        if (playlistID) {
            return '<iframe width="100%" height="auto" src="https://www.youtube.com/embed/videoseries?list=' + playlistID + '" frameborder="0" allowfullscreen></iframe>';
        } else {
            return 'Invalid YouTube link.';
        }
    }
}

function copyIframeCode() {
    var iframeCode = document.getElementById('iframeContainer').querySelector('textarea').value;
    if (!navigator.clipboard) {
        var textArea = document.createElement("textarea");
        textArea.value = iframeCode;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("Iframe code copied to clipboard!");
    } else {
        navigator.clipboard.writeText(iframeCode)
            .then(function() {
                alert('Iframe code copied to clipboard!');
            })
            .catch(function(error) {
                console.error('Failed to copy iframe code: ', error);
            });
    }
}

// Helper functions to extract video ID and playlist ID from YouTube links
function extractVideoID(link) {
    var videoIDRegex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    var match = link.match(videoIDRegex);
    return match ? match[1] : null;
}

function extractPlaylistID(link) {
    var playlistIDRegex = /[?&]list=([^#\&\?]+)/;
    var match = link.match(playlistIDRegex);
    return match ? match[1] : null;
}