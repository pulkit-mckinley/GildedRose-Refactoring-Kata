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

  decreaseQualityOfItemAtIndex(i) {
    this.items[i].quality = this.items[i].quality - 1;
  }

  decreaseSellInOfItemAtIndex(i) {
    this.items[i].sellIn = this.items[i].sellIn - 1;
  }

  increaseQualityOfItemAtIndex(i) {
    if (this.items[i].quality < 50) {
      this.items[i].quality = this.items[i].quality + 1;
    }
  }

  updateAgedBrieAndBackStageProductQuality(i) {
    if (this.items[i].quality < 50) {
      this.items[i].quality = this.items[i].quality + 1;
      if (this.items[i].name == "Backstage passes to a TAFKAL80ETC concert") {
        if (this.items[i].sellIn < 11 && this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
        }
        if (this.items[i].sellIn < 6 && this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
        }
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
        } else if (this.items[i].quality > 0) {
          this.decreaseQualityOfItemAtIndex(i);
        }

        this.decreaseSellInOfItemAtIndex(i);

        if (this.items[i].sellIn < 0) {
          if (this.items[i].name == "Aged Brie") {
            this.increaseQualityOfItemAtIndex(i);
          } else if (
            this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
          ) {
            this.items[i].quality = 0;
          } else if (this.items[i].quality > 0) {
            this.decreaseQualityOfItemAtIndex(i);
          }
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
