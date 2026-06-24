room.onPlayerJoin = function(player) {
    room.sendAnnouncement("¡Bienvenido " + player.name + " a mi servidor 24/7!", null, 0x00FF00, "bold", 2);
}
