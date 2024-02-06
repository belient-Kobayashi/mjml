document.addEventListener("DOMContentLoaded", function () {
    var mapObject = document.getElementById('map');
  
    // SVG内の要素にアクセスするためのDocumentオブジェクトを取得
    var svgDocument = mapObject.contentDocument;
  
    // 地図上の目印の要素を取得
    var markers = svgDocument.querySelectorAll('.marker');
  
    // ポップアップの要素を取得
    var popup = document.getElementById('popup');
    var popupTitle = document.getElementById('popupTitle');
    var popupContent = document.getElementById('popupContent');
  
    // 各目印にクリックイベントを追加
    markers.forEach(function (marker) {
      marker.addEventListener('click', function () {
        var info = marker.getAttribute('data-info');
        popupTitle.textContent = info;
        popupContent.textContent = "詳細情報がここに表示されます。";
        popup.style.display = 'block';
  
        // ポップアップを閉じるイベントを追加
        popup.addEventListener('click', function () {
          popup.style.display = 'none';
        });
      });
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    var map = L.map('map').setView([35.6938, 139.7536], 13);

    // 最大ズームレベルを15に設定
map.setMaxZoom(15);

// 最小ズームレベルを5に設定
map.setMinZoom(12);

    // カスタムのSVGマップを追加
    var customMap = L.imageOverlay('Map_of_tokyo_ja.svg', [[35.6938, 139.7536], [35.6838 + 0.1, 139.7536 + 0.1]]);
    customMap.addTo(map);

    // マーカーのアイコン画像を変更
    var customIcon = L.icon({
        iconUrl: 'pin.png',
        iconSize: [24, 32], // アイコンのサイズ
        iconAnchor: [16, 32], // アイコンのアンカーポイント
        popupAnchor: [0, -32] // ポップアップのアンカーポイント
    });

    // マーカーを追加
    var marker = L.marker([35.6895, 139.6917], {icon: customIcon}).addTo(map);

    // マーカーにポップアップを追加
    marker.bindPopup("<b>Custom Marker</b><br>詳細情報がここに表示されます.").openPopup();

    // 現在のズームレベルを取得
var currentZoomLevel = map.getZoom();

// コンソールに出力
console.log("現在のズームレベル:", currentZoomLevel);
});
