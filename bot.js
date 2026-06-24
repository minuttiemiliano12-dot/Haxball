// ==========================================
// CONFIGURACIÓN DE LA SALA (OFICIAL HAXBALL)
// ==========================================

// Configura el estadio inicial, límite de goles y tiempo
room.setDefaultStadium("Big");
room.setScoreLimit(5);
room.setTimeLimit(0);

// ==========================================
// FUNCIONES INTERNAS DEL BOT
// ==========================================

// Si no quedan administradores, le da admin al primer jugador que encuentre
function updateAdmins() { 
  var players = room.getPlayerList();
  
  // Si la sala está vacía, no hace nada
  if (players.length == 0) return; 
  
  // Si ya hay un administrador jugando, no hace nada
  if (players.find((player) => player.admin) != null) return; 
  
  // Le da admin al primer jugador de la lista
  room.setPlayerAdmin(players[0].id, true); 
}

// ==========================================
// EVENTOS DEL JUEGO (EVENT HANDLERS)
// ==========================================

// Qué pasa cuando un jugador entra a la sala
room.onPlayerJoin = function(player) {
  // Le da la bienvenida al jugador en el chat
  room.sendAnnouncement("¡Bienvenido " + player.name + " a la sala!", null, 0x00FF00, "bold", 2);
  
  // Revisa si hace falta asignarle admin
  updateAdmins();
}

// Qué pasa cuando un jugador se va de la sala
room.onPlayerLeave = function(player) {
  // Revisa si el que se fue era admin y le da la corona a otro
  updateAdmins();
}
