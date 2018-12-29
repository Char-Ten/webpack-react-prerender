function setFontSize(k) {
	document.documentElement.style.fontSize =
		(((k / 750) * 100) / 16) * 100 + "%";
}
export default function(){
	var W = document.documentElement.clientWidth;
        var H = document.documentElement.clientHeight;
        if (W < H) {
            setFontSize(W);
        } else {
            setFontSize(H);
        }
}