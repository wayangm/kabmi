// Fungsi $ adalah shorthand untuk document.querySelector()
const $ = (item) => {
    return document.querySelector(item);
  };
  
  // Fungsi $_ adalah shorthand untuk document.querySelectorAll()
  const $_ = (item) => {
    return document.querySelectorAll(item);
  };
  
  // Fungsi $fill digunakan untuk mengisi teks ke dalam elemen HTML
  const $fill = (item, text) => {
    item.innerHTML = text;
  };
  
  // Mendefinisikan nilai minimum untuk validasi form input
  const validAge = 18;
  const validWeight = 30;
  const validHeight = 100;
  
  // Memilih semua elemen setiap kelas dari DOM dan menyimpannya ke dalam variabel
  const numberInputs = $_(".number");
  const errorMessages = $_(".error-message");
  
  // Melakukan iterasi setiap elemen input dalam "numberInputs"
  numberInputs.forEach((input, i) => {
    // Menambahkan event listener "input" pada setiap elemen input
    input.addEventListener("input", () => {
      // Validasi nilai input apakah memnuhi nilai minimum yang sudah ditentukan
      if (!input.value) {
        errorMessages[i].textContent = "Harap isi Berat Badan.";
      } else if (i === 0 && input.value < validWeight) {
        errorMessages[i].textContent =
          "Tidak memenuhi nilai minimum yaitu " + validWeight + " kg";
      } else if (i === 1 && input.value < validAge) {
        errorMessages[i].textContent =
          "Tidak memenuhi nilai minimum yaitu " + validAge + " tahun";
      } else if (i === 2 && input.value < validHeight) {
        errorMessages[i].textContent =
          "Tidak memenuhi nilai minimum yaitu " + validHeight + " cm";
      } else {
        errorMessages[i].textContent = ""; // Clear error message if input is valid
      }
    });
  });
  
  // Membuat fungsi untuk memvalidasi nilai dari form input dan radio button
  function validation() {
    // Mendefinisikam kondisi awal objek
    let isRadioChecked = false;
    let isInputEmpty = true;
  
    $_("input").forEach((input) => {
      // Jika jenis kelamin dipilih, maka kondisi diubah menjadi "true"
      if (input.type === "radio" && input.checked) {
        isRadioChecked = true;
      }
      // Jika form kosong, kondisi diubah menjadi "false"
      if (input.value !== "") {
        isInputEmpty = false;
      }
    });
  
    // Jika salah satu kosong maka akan memunculkan peringatan ke user
    if (!isRadioChecked || isInputEmpty) {
      return ($(".warning").textContent = "*Semua kolom wajib diisi");
    }
  
    // Kondisi dimana jika validasi berhasil, peringatan akan dihapus
    return ($(".warning").textContent = "");
  }
  
  // Membuat fungsi untuk animasi scroll jika submit button ditekan
  function scrollToResult() {
    const resSection = document.getElementById("res");
    resSection.scrollIntoView({ behavior: "smooth" });
  }
  
  // Menambahkan event listener untuk button submit saat ditekan
  // Menjalankan proses kalkulasi perhitungan BMI dan menampilkan hasil
  $("#button-submit").addEventListener("click", async () => {
    (async () => {
      // Menginisialisasi objek dan value yang akan digunakan
      const hei = $("#height").value / 100,
        wei = $("#weight").value,
        age = $("#age").value;
  
      let res = 0;
  
      // Menbuat obbjek untuk menyimpan data hasil perhitungan BMI
      const stat = {
        head: "",
        info: "",
        nums: "",
        unit: "",
        sums: "",
        cats: "",
        type: "",
        avgs: "",
        suggest: "",
      };
  
      // Menjalankan fungsi-fungsi yang sudah didefinisikan sebelumnya
      validation();
      scrollToResult();
  
      // Mendefinisikan kondisi awal untuk radio button
      let isRadioChecked = false;
  
      $_("input").forEach((input) => {
        if (input.type === "radio" && input.checked) {
          isRadioChecked = true;
        }
      });
  
      // Perhitungan akan dilakukan jika memenuhi semua kriteria
      if (
        age >= validAge &&
        hei >= validHeight / 100 &&
        wei >= validWeight &&
        isRadioChecked
      ) {
        res = wei / (hei * hei);
        // Jika tidak maka perhitungan tidak dapat dilakukan
      } else {
        res = 0;
      }
  
      // Menginisialisasi DOM
      const sum_head = $("#sum-head"),
        sum_info = $("#sum-info"),
        sum_nums = $("#sum-nums"),
        sum_unit = $("#sum-unit"),
        sum_sums = $("#sum-sums"),
        sum_cats = $("#sum-cats"),
        sum_type = $("#sum-type"),
        sum_avgs = $("#sum-avgs"),
        sum_main = $("#num"),
        sum_suggest = $("#suggestion");
  
      // Titik awal kalkulasi dimulai
      if (res) {
        res = Math.floor(res * 10) / 10; // Minimzed behind commas
        const BMI = {
          n_min: 18.4,
          n_max: 24.9,
          o_min: 29.9,
          o_max: 34.9,
          min: Math.floor(18.4 * hei * hei * 10) / 10, // Normal min BMI * Height = min Weight
          max: Math.floor(24.9 * hei * hei * 10) / 10, // Normal max BMI * Height = max Weight
        };
  
        // Mengisi objek yang telah dideklarasikan sebelumnya
        stat.head = "BMI Anda:";
        stat.nums = `${res}`;
        stat.unit = "Kg";
  
        // Melakukan validasi nilai
        if (res <= BMI.n_min) {
          stat.info = "Kekurangan Berat Badan";
          stat.type =
            "Jika BMI Anda berada dalam kategori ini <br> Anda dianjurkan untuk menaikkan berat badan <br> hingga batas normal yaitu";
          stat.suggest =
            "<br> Kami menyarankan untuk berkonsultasi dengan dokter atau ahli gizi untuk mendapatkan rekomendasi kesehatan yang tepat serta memperbaiki pola makan dan melakukan olahraga ringan untuk menambah massa otot.";
          stat.sums = "Hasil BMI di bawah normal";
          stat.avgs = BMI.min;
          sum_main.style.color = "red";
        } else if (res > BMI.n_min && res <= BMI.n_max) {
          stat.info = "Normal";
          stat.type = "Pertahankan berat badan <br> Anda di";
          stat.suggest =
            "<br> Pertahankan gaya hidup sehat, rutinitas olahraga, dan istirahat cukup. Perhatikan keseimbangan kalori masuk dan keluar serta hindari makanan olahan dan manis.";
          stat.sums = "Hasil BMI Ideal";
          stat.avgs = `${BMI.min} - ${BMI.max}`;
          sum_main.style.color = "green";
        } else if (res > BMI.n_max && res <= BMI.o_min) {
          stat.info = "Berat Badan Berlebih";
          stat.type =
            "Jika BMI Anda berada dalam kategori ini <br> Anda dianjurkan untuk menurunkan berat badan <br> hingga batas normal yaitu";
          stat.suggest =
            "<br> Cara terbaik untuk menurunkan berat badan adalah mengubah pola makan dengan mengkonsumsi makanan rendah kalori, hindari makanan olahan, manis, tinggi lemak jenuh serta rutin berolahraga. Anda juga bisa bisa berkonsultasi dengan ahli gizi untuk mendapatkan bimbingan penurunan berat badan yang tepat.";
          stat.sums = "Hasil BMI sangat jauh di atas normal";
          stat.sums = "Hasil BMI di atas normal";
          stat.avgs = BMI.max;
          sum_main.style.color = "orange";
        } else if (res > BMI.o_min && res <= BMI.o_max) {
          stat.info = "Obesitas";
          stat.type =
            "Berat badan Anda jauh lebih berat <br> dari berat badan normal yaitu";
          stat.suggest =
            "<br> Cara terbaik untuk menurunkan berat badan adalah mengubah pola makan dengan mengkonsumsi makanan rendah kalori, hindari makanan olahan, manis, tinggi lemak jenuh serta rutin berolahraga. Anda juga bisa bisa berkonsultasi dengan ahli gizi untuk mendapatkan bimbingan penurunan berat badan yang tepat.";
          stat.sums = "Hasil BMI jauh di atas normal";
          stat.avgs = BMI.max;
          sum_main.style.color = "red";
        } else if (res > BMI.o_max) {
          stat.info = "Obesitas Tinggi";
          stat.type =
            "Kami sarankan agar Anda menurunkan <br> berat badan setidaknya hingga";
          stat.suggest =
            "<br> Cara terbaik untuk menurunkan berat badan adalah mengubah pola makan dengan mengkonsumsi makanan rendah kalori, hindari makanan olahan, manis, tinggi lemak jenuh serta rutin berolahraga. Anda juga bisa bisa berkonsultasi dengan ahli gizi untuk mendapatkan bimbingan penurunan berat badan yang tepat.";
          stat.sums = "Hasil BMI sangat jauh di atas normal";
          stat.avgs = Math.floor(BMI.max * 1.2 * 10) / 10;
          sum_main.style.color = "red";
        }
  
        // Mengisi setiap elemen dengan nilai yang dihasilkan dari kalkulasi di atas
        $fill(sum_head, stat.head);
        $fill(sum_info, stat.info);
        $fill(sum_nums, stat.nums);
        $fill(sum_sums, stat.sums);
        $fill(sum_unit, stat.unit);
        $fill(sum_type, stat.type);
        $fill(sum_cats, stat.cats);
        $fill(sum_avgs, stat.avgs);
        $fill(sum_suggest, stat.suggest);
      }
    })();
  });
  
  // Menambahkan event listener untuk button reset saat ditekan
  // Menghapus seluruh input data termasuk tampilan hasil kalkulasi BMI
  $("#button-reset").addEventListener("click", async () => {
    $_("input").forEach((input) => {
      input.value = ""; // Menghapus input data pada form input
      input.checked = false; // Mengembalikan kondisi radio button menjadi "false" atau tidak terpilih
  
      $(".warning").textContent = ""; // Manghapus pesan peringatan
  
      const sum_head = $("#sum-head"),
        sum_info = $("#sum-info"),
        sum_nums = $("#sum-nums"),
        sum_unit = $("#sum-unit"),
        sum_sums = $("#sum-sums"),
        sum_cats = $("#sum-cats"),
        sum_type = $("#sum-type"),
        sum_avgs = $("#sum-avgs"),
        sum_main = $("#num"),
        sum_suggest = $("#suggestion");
  
      // Menghapus atau mengembalikan ke kondisi awal
      $fill(sum_head, "Belum ada hasil");
      $fill(sum_info, "");
      $fill(sum_nums, "");
      $fill(sum_sums, "");
      $fill(sum_unit, "");
      $fill(sum_type, "");
      $fill(sum_cats, "");
      $fill(sum_avgs, "");
      $fill(sum_suggest, "");
  
      // Mengembalikan warna menjadi default
      sum_main.style.color = "initial";
    });
  });
  