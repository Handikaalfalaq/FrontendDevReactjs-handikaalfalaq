export const restoranBukaJamIni = (jamBuka, jamTutup) => {
    const waktuJamBuka = parseInt(jamBuka.split(':')[0])
    const waktuMenitBuka = parseInt(jamBuka.split(':')[1])
    const waktuJamTutup = parseInt(jamTutup.split(':')[0])
    const waktuMenitTutup = parseInt(jamTutup.split(':')[1])

    const now = new Date();
    const jamSekarang = now.getHours();
    const menitSekarang = now.getMinutes();
  
    if ((jamSekarang > waktuJamBuka) || (jamSekarang === waktuJamBuka && menitSekarang >= waktuMenitBuka)) {
      if((jamSekarang < waktuJamTutup) || (jamSekarang === waktuJamTutup && menitSekarang <= waktuMenitTutup)){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

export const hitungHargaTermurah = (d) => {
    if (d.daftarMenu.length !== 0) {
        return Math.min(...d.daftarMenu.map((menu) => menu.harga));
      } else {
        return 0;
      }
}

export const hitungHargaTermahal = (d) => {
    if (d.daftarMenu.length !== 0) {
    return Math.max(...d.daftarMenu.map((menu) => menu.harga));
    } else {
        return 0;
    }
}