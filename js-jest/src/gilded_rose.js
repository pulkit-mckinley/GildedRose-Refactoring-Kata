class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  decreaseQuality(decreaseBy = 1) {
    if (this.quality > 0) {
      this.quality = this.quality - decreaseBy;
    }
  }
  increaseQuality(increaseBy = 1) {
    if (this.quality < 50) {
      this.quality = this.quality + increaseBy;
    }
  }
  decreaseSellIn() {
    this.sellIn--;
  }

  updateQualityOnSellOnNegative() {
    if (this.name == "Aged Brie") {
      this.increaseQuality();
    } else if (this.name == "Backstage passes to a TAFKAL80ETC concert") {
      this.quality = 0;
    } else {
      this.decreaseQuality();
    }
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  maxQuality = 50;
  concertTicketSellByThreshold1 = 11;
  concertTicketSellByThreshold2 = 6;

  updateQualityOnSellOnNegativeOfItemAtIndex(i) {
    if (this.items[i].name == "Aged Brie") {
      this.items[i].increaseQuality();
    } else if (
      this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
    ) {
      this.items[i].quality = 0;
    } else {
      this.items[i].decreaseQuality();
    }
  }

  updateAgedBrieAndBackStageProductQuality(i) {
    this.items[i].increaseQuality();
    if (this.items[i].name == "Backstage passes to a TAFKAL80ETC concert") {
      if (this.items[i].sellIn < this.concertTicketSellByThreshold2) {
        this.items[i].increaseQuality(2);
      } else if (this.items[i].sellIn < this.concertTicketSellByThreshold1) {
        this.items[i].increaseQuality();
      }
    }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        if (
          this.items[i].name == "Aged Brie" ||
          this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
        ) {
          this.updateAgedBrieAndBackStageProductQuality(i);
        } else {
          this.items[i].decreaseQuality();
        }

        this.items[i].decreaseSellIn();

        if (this.items[i].sellIn < 0) {
          this.items[i].updateQualityOnSellOnNegative();
        }
      }
    }
    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
