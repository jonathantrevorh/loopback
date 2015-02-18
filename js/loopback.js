'use strict';

var templates = new Templates();
var audioContext = new window.AudioContext();

callbacks.onDOMReady.push(function () {
    templates.loadTemplatesFromDOM();
    templates.goTo('index');
});

templates.on('index', (function () {
    var handlers = {
        load: function () {
            setupWorker(gotStream, didNotGetStream);
        }, unload: function () {
            ;
        }
    };
    return handlers;
    function didNotGetStream() {
        alert('Refresh or leave');
    }
    function toggle() {
    }
    function gotStream(stream) {
        var source = audioContext.createMediaStreamSource(stream);

        var biquadFilter = audioContext.createBiquadFilter();
        biquadFilter.type = 'lowpass';
        biquadFilter.frequency.value = 5000;

        var gain = audioContext.createGain();
        var volumeSlider = templates.hookups['gain'];
        volumeSlider.value = 100*gain.gain.value;
        volumeSlider.onchange = function () {
            gain.gain.value = volumeSlider.value / 100;
        };

        wireUp([source, gain, audioContext.destination]);
    }
})());
