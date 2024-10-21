class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  maxQuality = 50;
  concertTicketSellByThreshold1 = 11;
  concertTicketSellByThreshold2 = 6;

  decreaseQualityOfItemAtIndex(i) {
    if (this.items[i].quality > 0) {
      this.items[i].quality = this.items[i].quality - 1;
    }
  }

  decreaseSellInOfItemAtIndex(i) {
    this.items[i].sellIn = this.items[i].sellIn - 1;
  }

  increaseQualityOfItemAtIndex(i, increaseBy = 1) {
    if (this.items[i].quality < this.maxQuality) {
      this.items[i].quality = this.items[i].quality + increaseBy;
    }
  }

  updateQualityOnSellOnNegativeOfItemAtIndex(i) {
    if (this.items[i].name == "Aged Brie") {
      this.increaseQualityOfItemAtIndex(i);
    } else if (
      this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
    ) {
      this.items[i].quality = 0;
    } else {
      this.decreaseQualityOfItemAtIndex(i);
    }
  }

  updateAgedBrieAndBackStageProductQuality(i) {
    this.increaseQualityOfItemAtIndex(i);
    if (this.items[i].name == "Backstage passes to a TAFKAL80ETC concert") {
      if (this.items[i].sellIn < this.concertTicketSellByThreshold2) {
        this.increaseQualityOfItemAtIndex(i, 2);
      } else if (this.items[i].sellIn < this.concertTicketSellByThreshold1) {
        this.increaseQualityOfItemAtIndex(i);
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
          this.decreaseQualityOfItemAtIndex(i);
        }

        this.decreaseSellInOfItemAtIndex(i);

        if (this.items[i].sellIn < 0) {
          this.updateQualityOnSellOnNegativeOfItemAtIndex(i);
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
