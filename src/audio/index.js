import * as THREE from 'three';

export const getAnalyser = (camera) => {
    const listener = new THREE.AudioListener();
    camera.add(listener);
    const sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();

    audioLoader.load('assets/audio/first_step.mp3', function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(1);
        sound.play();
    });

    return new THREE.AudioAnalyser(sound, 32);
}

export const analyseAudio = (analyser) => {

    const data = analyser.getFrequencyData();
    return {
        freq: data[10]
    }
}