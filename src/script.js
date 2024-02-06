
document.addEventListener("DOMContentLoaded", function () {
    var svgWidth = 0.1;
    var svgHeight = 0.1;
    var markers = [];

    var map = L.map('map', {
        crs: L.CRS.Simple,
        maxBounds: [
            [0, 0],
            [svgWidth, svgHeight]
        ]
    }).setView([svgHeight / 2, svgWidth / 2], 14);

    map.setMaxZoom(16);
    map.setMinZoom(13);

    var customMapBounds = [
        [0, 0],
        [svgHeight, svgWidth]
    ];

    var customMap = L.imageOverlay('Map_of_tokyo_ja.svg', customMapBounds);
    customMap.addTo(map);

    var customIcon = L.icon({
        iconUrl: 'pin.png',
        iconSize: [22, 32],
        iconAnchor: [16, 32],
        popupAnchor: [-200, 200]
    });

    // マーカーとポップアップの情報を含むオブジェクトの配列
    var markersData = [
        { name: "坂その1", latitude: 0, longitude: 0, popupContent: "<b>坂その1</b><p>皇居東御苑にある白鳥濠の北側の坂で、この坂を上ると旧本丸跡に出ます。『紫の一本』(戸田茂睡著)には、「此所より海よく見へ、汐のさしくる時は波ただ爰元へ寄るような故塩見坂といふ。今は家居にかくされて見へず。」とあり、下町方面が埋め立てられて、海岸線が遠くなり、市街地の栄えていくありさまがしのばれます。</p><img src='shiomi.jpeg'>" },
        { name: "坂その2", latitude: 150, longitude: 200, popupContent: "<b>坂その2</b><p>皇居東御苑にある白鳥濠の北側の坂で、この坂を上ると旧本丸跡に出ます。『紫の一本』(戸田茂睡著)には、「此所より海よく見へ、汐のさしくる時は波ただ爰元へ寄るような故塩見坂といふ。今は家居にかくされて見へず。」とあり、下町方面が埋め立てられて、海岸線が遠くなり、市街地の栄えていくありさまがしのばれます。</p><img src='shiomi.jpeg'>" },
        { name: "坂その3", latitude: 400, longitude: 100, popupContent: "<b>坂その3</b><p>皇居東御苑にある白鳥濠の北側の坂で、この坂を上ると旧本丸跡に出ます。『紫の一本』(戸田茂睡著)には、「此所より海よく見へ、汐のさしくる時は波ただ爰元へ寄るような故塩見坂といふ。今は家居にかくされて見へず。」とあり、下町方面が埋め立てられて、海岸線が遠くなり、市街地の栄えていくありさまがしのばれます。</p><img src='shiomi.jpeg'>" },
    ];

     // マーカーを作成し、ポップアップをバインドする
     markersData.forEach(function(data) {
        var marker = L.marker(map.containerPointToLatLng(L.point(data.latitude, data.longitude)), { icon: customIcon }).addTo(map);
        marker.bindPopup(data.popupContent);
        markers.push(marker);

        // リストアイテムを作成し、クリックイベントを追加する
        var li = document.createElement('li');
        li.textContent = data.name;
        li.addEventListener('click', function() {
            marker.openPopup();
            map.panTo(marker.getLatLng());
            addClassToMarker.call(marker);
        });
        document.getElementById('markers-list').appendChild(li);
    });

    // ポップアップが開かれたときにマーカーにクラスを追加し、閉じられたときにクラスを削除する
    for (var j = 0; j < markers.length; j++) {
        markers[j].on('popupopen', addClassToMarker);
        markers[j].on('popupclose', removeClassFromMarker);
    }

    function addClassToMarker() {
        this._icon.classList.add('active-marker');
    }

    function removeClassFromMarker() {
        this._icon.classList.remove('active-marker');
    }
});
