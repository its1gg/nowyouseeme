function scrollToBottomAndTop() {
    // النزول إلى أسفل الصفحة
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth' // التمرير بسلاسة
    });

    // التحقق من الوصول إلى نهاية الصفحة
    setTimeout(() => {
        // العودة إلى أعلى الصفحة بعد 3 ثواني
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // التمرير بسلاسة
        });
    }, 3000); // تأخير 3 ثوانٍ قبل العودة للأعلى
    
}
scrollToBottomAndTop();

latestfirst();

async function latestfirst() {

        let firstbtn = document.querySelector('.css-175oi2r:nth-child(3) > .css-175oi2r > .css-175oi2r:nth-child(2) > .css-146c3p1 > .r-4qtqp9');
        firstbtn.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        let secbtn = document.querySelector('[data-testid="Dropdown"] > .css-175oi2r:nth-child(3) .css-1jxf684');
        await new Promise(resolve => setTimeout(resolve, 3000));
}

// تعريف الـ array الذي يحتوي على المستخدمين
let users = document.querySelectorAll('[data-testid="primaryColumn"] > .css-175oi2r > .css-175oi2r:nth-child(3) > .css-175oi2r > div > div div.r-172uzmj');

// دالة لمحاكاة الـ hover
function hoverElement(element) {
    let event = new MouseEvent('mouseover', {
        view: window,
        bubbles: true,
        cancelable: true
    });
    element.dispatchEvent(event);
}

// تنفيذ العملية على جميع المستخدمين في الـ array
async function processUsers(users) {
    for (let i = 0; i < users.length; i++) {
        hoverElement(users[i]); // عمل hover على الـ user الحالي
        await new Promise(resolve => setTimeout(resolve, 1000)); // تأخير بسيط للتأكد من تنفيذ الـ hover
        await new Promise(resolve => setTimeout(resolve, 1000)); // تأخير بين العمليات
    }

    // بعد الانتهاء من جميع المستخدمين، يتم استدعاء الفنكشن الجديدة
    processFollowButtons();
}

// الفنكشن الجديدة التي تضغط على الأزرار
function processFollowButtons() {
    let btns = document.querySelectorAll('#layers > div.css-175oi2r.r-zchlnj.r-1d2f490.r-u8s1d.r-ipm5af.r-1p0dtai.r-105ug2t > div > div > div > div > div > div > div > div > div:nth-child(1) > div:nth-child(2) > button > div > span > span');
    
    var i = 0;
    let interval = setInterval(() => {
        if (i >= btns.length) {
            clearInterval(interval); // إيقاف الفنكشن عند انتهاء الأزرار
            return;
        }

        var btn = btns[i];
        btn.click(); // الضغط على الزر الحالي
        i++;
    }, 1000); // تأخير بين كل عملية ضغط
}

// بدء العملية
processUsers(users);



