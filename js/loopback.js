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
        volumeSlider.onchange = function () {
            var value = volumeSlider.value * 1;
            gain.gain.value = value;
            var textValue = Math.round(value * 1000) / 10 + '%';
            templates.hookups['volume-level'].innerText = textValue;
        };
        volumeSlider.onchange();

        wireUp([source, gain, audioContext.destination]);
    }
})());
