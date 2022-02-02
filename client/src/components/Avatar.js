import React from 'react';

// Random avatar for user
export default function Avatar(letter) {
    if ((letter === "a") || (letter === "q") || (letter === "w")) {
        return <img src="https://img.icons8.com/plasticine/100/000000/rick-sanchez.png" alt='avatar' />
    }
    else if ((letter === "z") || (letter === "s") || (letter === "x")) {
        return <img src="https://img.icons8.com/plasticine/100/000000/super-mario.png" alt='avatar' />
    }
    else if ((letter === "e") || (letter === "d") || (letter === "c")) {
        return <img src="https://img.icons8.com/plasticine/100/000000/futurama-bender.png" alt='avatar' />
    }
    else if ((letter === "r") || (letter === "f") || (letter === "v")) {
        return <img src="https://img.icons8.com/plasticine/100/000000/iron-man.png" alt='avatar' />
    }
    else if ((letter === "t") || (letter === "g") || (letter === "b")) {
        return <img src="https://img.icons8.com/plasticine/100/000000/jake.png" alt='avatar' />
    }
    else if ((letter === "y") || (letter === "h") || (letter === "n")) {
        return <img src="https://img.icons8.com/plasticine/100/000000/anonymous-mask.png" alt='avatar' />
    }
    else if ((letter === "u") || (letter === "j") || (letter === "i")) {
        return <img src="https://img.icons8.com/plasticine/100/000000/black-panther--v1.png" alt='avatar' />
    }
    else if ((letter === "o") || (letter === "l") || (letter === "p")) {
        return <img src="https://img.icons8.com/plasticine/100/000000/bt21-shooky.png" alt='avatar' />
    }
    else {
        return <img src="https://img.icons8.com/plasticine/100/000000/bt21-chimmy.png" alt='avatar' />
    }
}
