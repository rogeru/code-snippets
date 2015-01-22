(function() {
    $('body').empty();
    var div = document.createElement('div');
    document.body.appendChild(div);

    for (var i=10000; i<11499; i++) {
        div.textContent += "INSERT INTO USERS VALUES(" + i + ",NULL,'Roger" + i + " Muller','rog" + i + "@unify.com','Roger" + i + "',NULL,'http://localhost:8081/minions','Muller','EN_US','http://localhost:8081/minions','" + i + "','ACTIVE',1565,0,'abc123')";
        div.textContent += '\r';
        div.textContent += "INSERT INTO USERS_ROLE VALUES(" + i + ",'1')";
        div.textContent += '\r';
    }
})();