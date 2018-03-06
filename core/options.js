var smile_id = [];

document.addEventListener('DOMContentLoaded', function() {

    chrome['runtime'].sendMessage({
        cmd: "smilesGet"
    }, function(data) {

        smile_id = data.smiles;
        var off_smiles = data.off;

        var add_html = '';
        for (var s in smile_id) {
            var id = smile_id[s];
            var checked = 'checked="checked"';
            if (off_smiles[id]) checked = '';
            add_html += '<label class="emoji_smile_cont" ><input id="emo_' + id + '" ' + checked + ' type="checkbox" /><img class="emoji" src="https://vk.com/images/emoji/' + id + '.png"></label>';
        }

        var content = document.querySelector('#content');
        content.innerHTML = '<div id="moresmiles_options_items" >' + add_html +
            '<button class="btn" id="moresmiles_options_save" >Сохранить изменения</button>' +
            '</div>';

        var emosave = document.querySelector('#content #moresmiles_options_save');

        emosave.onclick = function() {
            off_smiles = {};
            var chboxes = document.querySelectorAll("#moresmiles_options_items .emoji_smile_cont > input");
            console.log(chboxes);
            for (var ch in chboxes) {
                var cb = chboxes[ch];
                if (cb.checked == undefined) continue;
                if (!cb.checked) {
                    var id = cb.getAttribute('id').replace("emo_", "");
                    off_smiles[id] = 1;
                }
            }
            chrome['runtime'].sendMessage({
                cmd: "offSet",
                off: off_smiles
            });
            alert("Изменения сохранены!");
        };

    });


});