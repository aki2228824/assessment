'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子供を全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChirdren(element) {
    while (element.firstChild) {//子どもの要素がある限り削除
        element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = function () {
    const userName = userNameInput.value;
    if (userName.length === 0) {//名前が空の時は処理を終了する
        return;
    }

    // 診断結果表示エリアの作成
    removeAllChirdren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // ツイートエリアの作成
    removeAllChirdren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
        + encodeURIComponent('あなたのいいところ')
        + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);

    // widgets.jsの設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

 //TODO ボタンのonclick()処理を呼び出す
 userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') { 
      assessmentButton.onclick();
    }
  }

const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆をひきつけ、心に残ります。',
    '{userName}の良いところはまなざしです。{userName}に見つめられた人は、気になって仕方ないでしょう。',
    '{userName}の良いところは情熱です。{userName}の情熱にまわりは感化されます。',
    '{userName}の良いところは厳しさです。{userName}の厳しさが物事をいつも成功に導きます。',
    '{userName}の良いところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}の良いところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}の良いところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}の良いところは見た目です。内側からあふれ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}の良いところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}の良いところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}の良いところは感受性です。{userName}が感じたことに皆が共感し、分かり合うことが出来ます。',
    '{userName}の良いところは節度です。強引過ぎない{userName}の考えに皆が感謝しています。',
    '{userName}の良いところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}の良いところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}の良いところはその全てです。ありのままの{userName}自信が良いところなのです。',
    '{userName}の良いところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param{string}userName ユーザーの名前
 * @return{string}診断結果
 */
function assessment(userName) {
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    //文字のコード番号の合計を回答の数で割って添え字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{userName\}/g, userName);
    return result;
}

//テストコード
console.assert(
    assessment('太郎') === '太郎の良いところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じなら同じ診断結果を出力する処理が正しくありません。'
);
