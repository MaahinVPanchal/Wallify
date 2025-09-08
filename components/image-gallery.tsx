"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Type, Layers } from "lucide-react"

interface TextOverlaySettings {
  text: string
  fontSize: number
  fontFamily: string
  color: string
  strokeColor: string
  strokeWidth: number
  position: { x: number; y: number }
  rotation: number
  opacity: number
}

interface ImageGalleryItemProps {
  image: any
  onSetWallpaper: (image: any) => void
  onDownload: (image: any) => void
  onUpdateTextOverlay: (imageId: string, settings: TextOverlaySettings) => void
  onRemoveImage: (imageId: string) => void
}

const FONT_FAMILIES = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "Verdana",
  "Comic Sans MS",
  "Impact",
  "Trebuchet MS",
  "Courier New",
  "Brush Script MT",
]

export function ImageGalleryItem({
  image,
  onSetWallpaper,
  onDownload,
  onUpdateTextOverlay,
  onRemoveImage,
}: ImageGalleryItemProps) {
  const [textSettings, setTextSettings] = useState<TextOverlaySettings>({
    text: image.textOverlay || "",
    fontSize: 48,
    fontFamily: "Arial",
    color: "#ffffff",
    strokeColor: "#000000",
    strokeWidth: 2,
    position: { x: 50, y: 80 },
    rotation: 0,
    opacity: 100,
  })

  const updateTextSetting = (key: keyof TextOverlaySettings, value: any) => {
    const newSettings = { ...textSettings, [key]: value }
    setTextSettings(newSettings)
    onUpdateTextOverlay(image.id, newSettings)
  }

  return (
    <Card className="anime-card overflow-hidden group">
      <div className="relative">
        <img
          src={image.url || "/placeholder.svg"}
          alt={image.name}
          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
          style={{
            filter: `brightness(${image.adjustments.brightness}%) contrast(${image.adjustments.contrast}%) saturate(${image.adjustments.saturation}%) hue-rotate(${image.adjustments.hue}deg) blur(${image.adjustments.blur}px) opacity(${image.adjustments.opacity}%)`,
          }}
        />

        {textSettings.text && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${textSettings.position.x}%`,
              top: `${textSettings.position.y}%`,
              transform: `translate(-50%, -50%) rotate(${textSettings.rotation}deg)`,
              opacity: textSettings.opacity / 100,
            }}
          >
            <span
              style={{
                fontSize: `${textSettings.fontSize}px`,
                fontFamily: textSettings.fontFamily,
                color: textSettings.color,
                WebkitTextStroke: `${textSettings.strokeWidth}px ${textSettings.strokeColor}`,
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              {textSettings.text}
            </span>
          </div>
        )}

        {image.isGenerated && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium sparkle-effect">
            AI Generated
          </div>
        )}

        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          ✓ Live
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-card-foreground mb-2 truncate">{image.name}</h3>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-input">
            <TabsTrigger value="basic" className="text-xs">
              Basic
            </TabsTrigger>
            <TabsTrigger value="advanced" className="text-xs">
              Advanced
            </TabsTrigger>
            <TabsTrigger value="style" className="text-xs">
              Style
            </TabsTrigger>
            <TabsTrigger value="overlay" className="text-xs bg-accent text-accent-foreground">
              Overlay
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overlay" className="space-y-4 mt-4">
            <div className="space-y-3">
              <Label className="text-sm text-muted-foreground flex items-center">
                <Type className="h-3 w-3 mr-1" />
                Text Overlay
              </Label>

              <Input
                placeholder="Enter text..."
                value={textSettings.text}
                onChange={(e) => updateTextSetting("text", e.target.value)}
                className="bg-input border-border text-foreground"
              />

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Font</Label>
                  <Select
                    value={textSettings.fontFamily}
                    onValueChange={(value) => updateTextSetting("fontFamily", value)}
                  >
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {FONT_FAMILIES.map((font) => (
                        <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                          {font}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Size</Label>
                  <Slider
                    value={[textSettings.fontSize]}
                    onValueChange={([value]) => updateTextSetting("fontSize", value)}
                    min={12}
                    max={120}
                    step={2}
                    className="mt-1"
                  />
                  <span className="text-xs text-muted-foreground">{textSettings.fontSize}px</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Text Color</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={textSettings.color}
                      onChange={(e) => updateTextSetting("color", e.target.value)}
                      className="w-8 h-8 rounded border border-border"
                    />
                    <Input
                      value={textSettings.color}
                      onChange={(e) => updateTextSetting("color", e.target.value)}
                      className="bg-input border-border text-foreground text-xs"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Stroke Color</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={textSettings.strokeColor}
                      onChange={(e) => updateTextSetting("strokeColor", e.target.value)}
                      className="w-8 h-8 rounded border border-border"
                    />
                    <Input
                      value={textSettings.strokeColor}
                      onChange={(e) => updateTextSetting("strokeColor", e.target.value)}
                      className="bg-input border-border text-foreground text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Position X: {textSettings.position.x}%</Label>
                <Slider
                  value={[textSettings.position.x]}
                  onValueChange={([value]) => updateTextSetting("position", { ...textSettings.position, x: value })}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Position Y: {textSettings.position.y}%</Label>
                <Slider
                  value={[textSettings.position.y]}
                  onValueChange={([value]) => updateTextSetting("position", { ...textSettings.position, y: value })}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Rotation: {textSettings.rotation}°</Label>
                <Slider
                  value={[textSettings.rotation]}
                  onValueChange={([value]) => updateTextSetting("rotation", value)}
                  min={-180}
                  max={180}
                  step={5}
                />
              </div>
            </div>

            {/* Gradient Overlay */}
            <div>
              <Label className="text-sm text-muted-foreground flex items-center mb-2">
                <Layers className="h-3 w-3 mr-1" />
                Gradient Overlay
              </Label>
              <Select
                value={image.gradientOverlay || "none"}
                onValueChange={(value) => image.updateGradientOverlay?.(value)}
              >
                <SelectTrigger className="bg-input border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="sunset">Sunset</SelectItem>
                  <SelectItem value="ocean">Ocean</SelectItem>
                  <SelectItem value="forest">Forest</SelectItem>
                  <SelectItem value="purple">Purple Dream</SelectItem>
                  <SelectItem value="fire">Fire</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          {/* ... existing tabs content ... */}
        </Tabs>

        <div className="flex space-x-2 mt-4">
          <Button
            size="sm"
            className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground magical-glow"
            onClick={() => onSetWallpaper(image)}
            disabled={image.isProcessing}
          >
            {image.isProcessing ? "Processing..." : "Set as Wallpaper"}
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => onDownload(image)}
            className="border-border hover:bg-accent/10"
          >
            <Download className="h-3 w-3" />
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => onRemoveImage(image.id)}
            className="border-border hover:bg-destructive/10 text-destructive"
          >
            Remove
          </Button>
        </div>
      </div>
    </Card>
  )
}
