/* eslint-disable */

// بنعمل export للدالة عشان index.js يقدر يشوفها ويستدعيها
export const displayMap = (locations) => {
  // 1. شرط الحماية (Defensive Programming): عشان لو مفيش داتا الكود ميضربش إيرور
  if (!locations || locations.length === 0) {
    console.error('No locations found for this tour!');
    return;
  }

  // 2. تعريف الـ API Key بتاع MapTiler
  maptilersdk.config.apiKey = 'rG1cLwY43y88cCWHBMZs';

  // 3. إنشاء الخريطة
  const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.STREETS,
    scrollZoom: false, // بنقفل زووم البكرة عشان ميزعجش اليوزر وهو بيعمل سكرول
  });

  // 4. تعريف حدود الخريطة
  const bounds = new maptilersdk.LngLatBounds();

  // 5. اللوب على الأماكن عشان نحط الدبابيس والمربعات النصية
  locations.forEach((loc) => {
    // بنعمل الدبوس الأخضر بتاع التصميم
    const el = document.createElement('div');
    el.className = 'marker';

    // بنجهز المربع النصي (Popup) ونديله الإحداثيات
    const popup = new maptilersdk.Popup({
      offset: 35, // مسافة عشان المربع ميبقاش لازق في الدبوس
      closeOnClick: false, // عشان المربع ميقفلش لو اليوزر داس في أي حتة فاضية
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`);

    // بنعمل الدبوس ونربطه بالمربع
    new maptilersdk.Marker({
      element: el,
      anchor: 'bottom', // عشان سن الدبوس يقف على المكان بالظبط
    })
      .setLngLat(loc.coordinates)
      .setPopup(popup)
      .addTo(map);

    // بنجبر المربع إنه يظهر على الخريطة فوراً أول ما الصفحة تفتح
    popup.addTo(map);

    // توسيع الحدود عشان تشمل المكان ده
    bounds.extend(loc.coordinates);
  });

  // 6. لما الخريطة تخلص تحميل، بنعمل الزووم وتوسيع الرؤية
  map.on('load', () => {
    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100,
      },
      maxZoom: 12, // أقصى زووم عشان الخريطة متبقاش قريبة قوي
    });
  });
};
