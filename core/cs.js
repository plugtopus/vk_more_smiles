var smile_id = [];
var href = location.href.split('/');
var domain = href[2].split('.');

chrome['runtime'].sendMessage({
    cmd: "smilesGet"
}, function(data) {

    smile_id = data.smiles;
    var off_smiles = data.off;

    if (domain.length == 2 || domain[0] == 'new') {
        setInterval(function() {

            var emoji = document.querySelectorAll('.emoji_list .emoji_scroll');

            if (emoji.length > 0) {
                for (var e in emoji) {
                    if (!emoji[e]) continue;
                    var current = emoji[e];
                    if (!current.getAttribute) continue;
                    var moresmiles_options = current.querySelector('.moresmiles_options');

                    if (!moresmiles_options) {
                        var parid = current.parentNode.parentNode.parentNode.parentNode.parentNode.id.replace('emoji_block_', '');

                        var html = current.innerHTML;
                        var add_html = '<a class="moresmiles_options" ><img class="emoji" src="/images/emoji/2699.png"><b>Настройки смайлов</b></a>';
                        for (var s in smile_id) {
                            var id = smile_id[s];
                            if (off_smiles[id]) continue;
                            add_html += '<a class="emoji_smile_cont" onmousedown="Emoji.addEmoji(Emoji.shownId, \'' + id + '\', this); return cancelEvent(event);" onclick="return cancelEvent(event);" onmouseover="return Emoji.emojiOver(' + parid + ', this, true);"><div class="emoji_bg"></div><div class="emoji_shadow"></div><img class="emoji" src="/images/emoji/' + id + '.png"></a>';
                        }
                        current.innerHTML = add_html + html;
                        var moresmiles_options_btn = current.querySelector('.moresmiles_options');
                        moresmiles_options_btn.onclick = function() {
                            chrome['runtime'].sendMessage({
                                cmd: "optsOpen"
                            });
                        };
                    }
                }
            }


            var stID = 'dfgsdg2345cf24fdrfgdfgsd';
            var st = document.getElementById(stID);
            if (!st) {
                var st = document.createElement('style');
                st.id = stID;
                st.innerHTML = '.moresmiles_options{ display: block; padding: 4px; } .moresmiles_options > b{ margin: 5px; vertical-align: middle; }';
                document.body.appendChild(st);
            }
        }, 500);
    }

});