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

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (
        this.items[i].name == "Aged Brie" ||
        this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
      ) {
        this.updateAgedBrieAndBackStageProductQuality(this.items[i]);
      } else if (this.items[i].quality > 0) {
        if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
          this.items[i].quality = this.items[i].quality - 1;
        }
      }

      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Aged Brie") {
          if (
            this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }

  updateAgedBrieAndBackStageProductQuality(item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
      if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
        if (item.sellIn < 11 && item.quality < 50) {
          item.quality = item.quality + 1;
        }
        if (item.sellIn < 6 && item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
    }
  }
}

module.exports = {
  Item,
  Shop,
};
