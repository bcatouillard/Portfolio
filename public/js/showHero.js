setInterval(showHeroTitle, 35);
let countHeroTitle = 0;
let heroTitleConcat = "";
let heroTitle = "Benjamin Catouillard";
const maxCountHeroTitle = heroTitle.length;



setInterval(showHeroSubtitle, 35);
let heroSubtitle = "Développeur Web Junior";
let heroSubtitleConct = "";
let count = 0;
const maxCountHeroSubtitle = heroSubtitle.length;

function showHeroTitle() {
    if (countHeroTitle < maxCountHeroTitle) {
        countHeroTitle++;
        heroTitleConcat += heroTitle[countHeroTitle - 1];
        document.getElementById("heroTitle").innerHTML = heroTitleConcat;
    }
}

function showHeroSubtitle() {
    if (count < maxCountHeroSubtitle) {
        count++;
        heroSubtitleConct += heroSubtitle[count - 1];
        document.getElementById("heroSubtitle").innerHTML = heroSubtitleConct;
    }
}