export const getImageForWeather = (weather) => {
    switch (weather) {
        case 'Showers':
        return './assets/showers.jpg';
        case 'Light Cloud':
        return './assets/lightCloud.jpg';
        case 'Heavy Cloud':
        return './assets/heavyCloud.jpg';
        case 'Clear':
        return './assets/clear.jpg';
        default:
        return './assets/sunny.jpg';
    }
}