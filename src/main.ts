import { pins } from "@dsboard/esp32s3_box_lite"
import * as ds from "@devicescript/core"
import { ST7789Driver } from "@devicescript/drivers"
import { spi } from "@devicescript/spi"
import { Image } from "@devicescript/graphics"

spi.configure({
    mosi: pins.P6,
    sck: pins.P7,
    miso: pins.P13,
    hz: 40_000_000,
})

pins.P45.setMode(ds.GPIOMode.OutputHigh)

const display = new ST7789Driver(Image.alloc(240, 320, 4), {
    dc: pins.P4,
    cs: pins.P5,
    reset: pins.P48,
    // frmctr1: 0x0e_14_ff,
    flip: true,
    spi: spi,
    offX: 40,
    offY: 53,
})

await display.init()
display.image.print("Hello world!", 3, 10)
await display.show()

