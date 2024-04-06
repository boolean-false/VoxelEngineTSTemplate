import Vector3 from "./vector3";

on_placed = (x, y, z, playerId) => {
    const position = new Vector3(x, y, z)
    print(`Установили блок ${position.toString()}`)
}

on_interact = (x, y, z, playerId) => {
    const position = new Vector3(x, y, z)
    print(`Нажали на блок ${position.toString()}`)
    return true
}