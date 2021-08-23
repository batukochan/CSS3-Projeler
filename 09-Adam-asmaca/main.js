let secretword = document.querySelector("#kelime"); //Id'si kelime olan inputu yakalandı. (secretword.value --> bulunması gereken kelime)

let baslabtn = document.querySelector("#baslabtn");

mainWord = []; //Programda bulunacak kelimenin global kullanımı için array oluşturuldu.
mistakeCounter = 0; //Globalde hata sayacı atandı.



let Words = [
  "audi",
  "lotus",
  "ford",
  "tofaş",
  "honda",
  "volkswagen",
  "renault",
  "fiat",
  "citroen",
  "lexus",
  "mclaren",
  "opel",
]; // Tahmin edilecek kelimeler array icerisinde yazıldı.

function start() {
  if (Words.length != 0) {
    //Döngü, tahmin edilecek kelimelerin sayısı "0" değilse yarışma devam edecek şekilde tasarlandı. ("0" ise "else" bloğu çalışacak)

    let random = Math.floor(Math.random() * Words.length); //"random" değişkenine sıfır ile toplam kelime sayısı (dahil) arasında rastgele bir sayi atandı.
    let choosenWord = Words[random]; //Oyunda tahmin edilecek kelime rastgele belirlendi.
    Words.splice(random, 1); //Oyunda tahmin edilecek kelime tekrar gelmemesi için array'den silindi. [ array.splice( hangiIndextenİtibaren, silinecekElemanSayısı) ]

    let str2arr = choosenWord.split(""); //Oyunda tahmin edilecek kelime stringden array'e çevirildi.
    mainWord = choosenWord.split(""); //Global kullanım için seçilen kelime array olarak alındı.

    var hideCount = Math.round(str2arr.length / 2 + 1); //Oyunda gizlenecek karakter adeti belirlendi. Aşağıdaki döngüde kullanıldı. (6 harfli kelime için --> 6/2+1=4 harf gizlenecek.)

    for (let index = 0; index < hideCount; index++) {
      let random = parseInt(Math.random() * str2arr.length); //Bu döngüde, oyunda tahmin edilecek kelimeden rastgele seçilen harfler "_" ile değiştirildi.
      str2arr[random] = "_";
    }

    secretword.value = str2arr.join("");
     //Döngüden gelen array, oyunda gösterilmesi için string'e çevirildi ve ana kelimeye atandı.

     baslabtn.setAttribute("disabled", true); // oyuna basladigimizda basla butonunu tekrar basamamasi saglandi.
     
  } else {
    alert("Kelimelerin bittiği yerdeyiz.\nSayfa yenilenecek.");
    location.reload(); // Sayfayı yeniler.
  }
}

function guess() {
  let playerInput = document.querySelector('input[id="tahmin"]').value; //Oyunda klavyeden girilen harf yakalandı.

  let guessBox = document.querySelector("#tahmin"); //Tahmin yapılan kutu ileride temizleyebilmek için yakalandı.
  let image = document.querySelector(".adamAsmaca img"); // ".adamAsmaca" classına sahip img ileride değiştirilebilmesi için çağırıldı.

  if (mainWord.indexOf(playerInput)!= -1) {
    let index = mainWord.indexOf(playerInput); //Doğru harfin "mainWord" arrayindeki indexi "index" değişkenine atandı.

    let word = document.querySelector("#kelime").value.split
    ('');
    
    console.log(word);
    //Ekranda gözüken kelime (gizli haliyle) yakalandı.Ekranda gözüken kelimede index bazında değişiklik yapmak için arraye çevirildi.

    word[index] = playerInput; //Ekranda gözüken kelimeye oyuncunun girdiği harf eklendi.
    secretword.value = word.join(""); //Harf eklenen array, oyunda gösterilmesi için string'e çevirildi ve ana kelimeye atandı.

    let mainStr = mainWord.join("");

    if (secretword.value == mainStr) {
      //Ekranda gözüken kelime ve aranan kelime aynıysa;
      if (Words.length == 0) {
        //Ekranda gözüken kelime ve aranan kelime aynı ve arrayde başka kelime yoksa;
        alert(
          "Tebrikler! Doğru cevap: " +
            mainStr +
            "\nOyun bitti. Sayfa yenilenecek."
        );
        location.reload();
      } else {
        //Ekranda gözüken kelime ve aranan kelime aynı ama arrayde başka kelime varsa;
        alert(
          "Tebrikler! Doğru cevap: " + mainStr + "\nSıradaki kelimeye geçelim."
        );
        guessBox.value = ""; //Tahmin yapılan kutu yeni giriş için temizlendi.
        mistakeCounter = 0; //Hata sıfırlandı.
        image.setAttribute("src", `./images/image0.png`); //Hata sıfırlandığı için resim de başa döndü.

        start(); //Yeni kelime için "start" fonksiyonu çağırıldı.
      }
    } else {
      //Ekranda gözüken kelime ve aranan kelime aynı değilse; (Ekranda tamamlanamış kelime var.)
      guessBox.value = ""; //Tahmin yapılan kutu yeni giriş için temizlendi.
    }
  } else if (mistakeCounter == 6) {
    //"condition" false değeri döndürürse (Yakalanan harf kelimede yoksa) ve maksimum hata sayısına ulaşıldıysa;
    alert("Oyunu kaybettiniz. Sayfa yenilenecektir.");
    location.reload();
  } else {
    //"condition" false değeri döndürüyor ancak maksimum hata sayısına ulaşılmadıysa;
    mistakeCounter += 1;
    image.setAttribute("src", `./images/image${mistakeCounter}.png`); //Her hatada bir adım ileri gidildi.
    guessBox.value = ""; //Tahmin yapılan kutu yeni giriş için temizlendi.
  }
}
