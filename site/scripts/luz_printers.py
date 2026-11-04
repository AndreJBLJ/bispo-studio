# Gera as impressoras "iluminadas" da versão Luz a partir das fotos enviadas pelo dono.
# Uso: python3 site/scripts/luz_printers.py <pasta com 1.jpg 2.jpg 3.jpg> site/public/impressoras
import sys
from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageOps
D, OUT = sys.argv[1], sys.argv[2]
W, H = 1300, 1625
src = {'1.jpg': ('creality-k1c', 255), '2.jpg': ('bambu-h3c', 247), '3.jpg': ('bambu-a1-mini', 255)}
def lerp(a, b, t): return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))
SH, MID, HI = (6, 3, 24), (70, 38, 190), (214, 200, 255)
lut = [lerp(SH, MID, (v/255)/0.55) if v/255 < 0.55 else lerp(MID, HI, (v/255 - 0.55)/0.45) for v in range(256)]
for n, (name, bg) in src.items():
    im = Image.open(f'{D}/{n}').convert('RGB'); w, h = im.size
    if n == '2.jpg': im = im.crop((0, 0, w, int(h * 0.905)))  # tira a frase sobre os filamentos
    k = 255 / (bg - 6); im = im.point(lambda v: min(255, int(v * k)))
    g = im.convert('L')
    b = g.point(lambda v: 255 if v > 246 else 0)
    for xy in [(0, 0), (b.width-1, 0), (0, b.height-1), (b.width-1, b.height-1)]:
        if b.getpixel(xy) == 255: ImageDraw.floodfill(b, xy, 128)
    # fundo = branco ligado às bordas, mais qualquer área branco puro (ex.: dentro do arco do cabo da A1 mini)
    white = g.point(lambda v: 255 if v >= 253 else 0).filter(ImageFilter.MinFilter(5)).filter(ImageFilter.MaxFilter(5))
    bgmask = ImageChops.lighter(b.point(lambda v: 255 if v == 128 else 0), white)
    matte = ImageOps.invert(bgmask).filter(ImageFilter.MedianFilter(5)).filter(ImageFilter.GaussianBlur(1.2))
    box = matte.getbbox(); im = im.crop(box); matte = matte.crop(box)
    s = min((W * 0.86) / im.width, (H * 0.95) / im.height)
    size = (int(im.width * s), int(im.height * s))
    im = im.resize(size, Image.LANCZOS); matte = matte.resize(size, Image.LANCZOS)
    lum = ImageOps.autocontrast(im.convert('L'), cutoff=1)
    rgb = Image.new('RGB', size); px = rgb.load(); lp = lum.load()
    for y in range(size[1]):
        for x in range(size[0]):
            px[x, y] = lut[lp[x, y]]
    shift = max(6, size[0] // 90)
    edge = ImageChops.subtract(matte, ImageChops.offset(matte, -shift, shift // 2)).filter(ImageFilter.GaussianBlur(shift * 0.9))
    edge = edge.point(lambda v: min(255, int(v * 2.4)))
    rgb = Image.composite(ImageChops.screen(rgb, Image.new('RGB', size, (136, 249, 192))), rgb, edge)
    glow = ImageChops.offset(matte, shift * 2, 0).filter(ImageFilter.GaussianBlur(shift * 5)).point(lambda v: int(v * 0.7))
    canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ox, oy = (W - size[0]) // 2, H - size[1]
    glowL = Image.new('RGBA', size, (136, 249, 192, 0)); glowL.putalpha(glow)
    canvas.alpha_composite(glowL, (ox, oy))
    obj = rgb.convert('RGBA'); obj.putalpha(matte)
    canvas.alpha_composite(obj, (ox, oy))
    canvas.save(f'{OUT}/{name}-luz.webp', quality=86, method=6)
    print(name, size)
