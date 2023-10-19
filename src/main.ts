import { pins } from "@dsboard/esp32s3_box_lite";
import * as ds from "@devicescript/core";
import { ST7789Driver } from "@devicescript/drivers";
import { spi } from "@devicescript/spi";
import { Image } from "@devicescript/graphics";

spi.configure({
    mosi: pins.P6,
    sck: pins.P7,
    miso: pins.P13,
    hz: 40_000_000,
})

pins.P45.setMode(ds.GPIOMode.OutputHigh) // backlight set high

const display = new ST7789Driver(Image.alloc(260, 220, 4), { 
    dc: pins.P4,
    cs: pins.P5,
    reset: pins.P48,
    flip: true, 
    spi: spi,
    offX: 0,
    offY: 0,  
})

pins.P45.setMode(ds.GPIOMode.OutputLow) // backlight set low

await display.init();
await display.image.printCenter("Hello World!", display.image.height / 2);
await display.show();
