"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Monitor,
  Palette,
  Upload,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  Sun,
  Eye,
  Download,
  Settings,
  CheckCircle,
  Wand2,
  Contrast,
  Droplets,
  Focus,
  Paintbrush,
  Beer as Blur,
  Circle,
  Layers,
  Type,
  Crop,
  Filter,
  Clock,
  Gift,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ImageAdjustments {
  brightness: number
  contrast: number
  saturation: number
  sharpness: number
  hue: number
  blur: number
  vignette: number
  opacity: number
}

interface TextOverlaySettings {
  text: string
  fontSize: number
  fontFamily: string
  color: string
  strokeColor: string
  strokeWidth: number
  x: number
  y: number
  rotation: number
  opacity: number
}

interface UploadedImage {
  id: string
  url: string
  name: string
  size: number
  uploadProgress: number
  isUploaded: boolean
  adjustments: ImageAdjustments
  cropMode: string
  filter: string
  processedUrl?: string
  isProcessing?: boolean
  isGenerated?: boolean
  textOverlay?: TextOverlaySettings
  gradientOverlay?: string
}

const SCREEN_RESOLUTIONS = {
  "1920x1080": { width: 1920, height: 1080 },
  "2560x1440": { width: 2560, height: 1440 },
  "3840x2160": { width: 3840, height: 2160 },
  "1366x768": { width: 1366, height: 768 },
  "1440x900": { width: 1440, height: 900 },
}

const GENERATION_STYLES = [
  "Abstract",
  "Nature",
  "Minimalist",
  "Geometric",
  "Space",
  "Cyberpunk",
  "Watercolor",
  "Digital Art",
  "Photography",
  "Artistic",
]

const CROP_MODES = [
  { value: "fill", label: "Fill (Crop to fit)" },
  { value: "fit", label: "Fit (Show all)" },
  { value: "stretch", label: "Stretch" },
  { value: "center", label: "Center" },
  { value: "tile", label: "Tile" },
]

const FILTER_PRESETS = [
  { value: "none", label: "None" },
  { value: "vintage", label: "Vintage" },
  { value: "sepia", label: "Sepia" },
  { value: "neon", label: "Neon" },
  { value: "dark", label: "Dark Mode" },
  { value: "cool", label: "Cool Blue" },
  { value: "warm", label: "Warm Orange" },
  { value: "grayscale", label: "Grayscale" },
]

const GRADIENT_OVERLAYS = [
  { value: "none", label: "None" },
  { value: "sunset", label: "Sunset" },
  { value: "ocean", label: "Ocean" },
  { value: "forest", label: "Forest" },
  { value: "purple", label: "Purple Dream" },
  { value: "fire", label: "Fire" },
]

const FONT_FAMILIES = [
  { value: "Arial", label: "Arial" },
  { value: "Helvetica", label: "Helvetica" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Georgia", label: "Georgia" },
  { value: "Verdana", label: "Verdana" },
  { value: "Impact", label: "Impact" },
  { value: "Comic Sans MS", label: "Comic Sans MS" },
  { value: "Trebuchet MS", label: "Trebuchet MS" },
]

export default function WallpaperApp() {
  const [isSignedUp, setIsSignedUp] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [currentStep, setCurrentStep] = useState<"signup" | "signin" | "dashboard">("signup")
  const [userScreenSize, setUserScreenSize] = useState<string>("1920x1080")

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const screenSize = formData.get("screen-size") as string
    setUserScreenSize(screenSize)
    setIsSignedUp(true)
    setCurrentStep("signin")
  }

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSignedIn(true)
    setCurrentStep("dashboard")
  }

  if (currentStep === "dashboard") {
    return <Dashboard userScreenSize={userScreenSize} />
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 text-4xl anime-float" style={{ animationDelay: "0s" }}>
          🌟
        </div>
        <div className="absolute top-40 right-32 text-3xl anime-float" style={{ animationDelay: "1s" }}>
          ✨
        </div>
        <div className="absolute bottom-32 left-16 text-2xl anime-float" style={{ animationDelay: "2s" }}>
          🌙
        </div>
        <div className="absolute bottom-20 right-20 text-3xl anime-float" style={{ animationDelay: "0.5s" }}>
          ⭐
        </div>
      </div>

      <Card className="w-full max-w-md anime-card magical-glow">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center sparkle-effect">
            <Palette className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-neon">
            {currentStep === "signup" ? "Join WallCraft ✨" : "Welcome Back! 🌟"}
          </CardTitle>
          <CardDescription className="text-white/80">
            {currentStep === "signup"
              ? "Create magical wallpapers for your desktop"
              : "Sign in to access your wallpaper collection"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={currentStep === "signup" ? handleSignUp : handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed text-white"
              >
                Email
              </Label>
              <Input id="email" placeholder="Enter your email" type="email" required className="h-10" />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed text-white"
              >
                Password
              </Label>
              <Input id="password" placeholder="Enter your password" type="password" required className="h-10" />
            </div>
            {currentStep === "signup" && (
              <div className="space-y-2">
                <Label
                  htmlFor="screen-size"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed text-white"
                >
                  Screen Resolution
                </Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1920x1080">1920 x 1080 (Full HD)</SelectItem>
                    <SelectItem value="2560x1440">2560 x 1440 (2K)</SelectItem>
                    <SelectItem value="3840x2160">3840 x 2160 (4K)</SelectItem>
                    <SelectItem value="1366x768">1366 x 768 (HD)</SelectItem>
                    <SelectItem value="1440x900">1440 x 900 (WXGA+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <Button className="w-full h-11">{currentStep === "signup" ? "Create Account" : "Sign In"}</Button>
            <p className="text-center text-sm text-muted-foreground">
              {currentStep === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                className="underline underline-offset-2 text-primary"
                onClick={() => setCurrentStep(currentStep === "signup" ? "signin" : "signup")}
              >
                {currentStep === "signup" ? "Sign in" : "Sign up"}
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function Dashboard({ userScreenSize }: { userScreenSize: string }) {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [isGenerateOpen, setIsGenerateOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationPrompt, setGenerationPrompt] = useState("")
  const [generationStyle, setGenerationStyle] = useState("Abstract")
  const [livePreviewImage, setLivePreviewImage] = useState<UploadedImage | null>(null)
  const [isSchedulerActive, setIsSchedulerActive] = useState(false)
  const [schedulerInterval, setSchedulerInterval] = useState(30)
  const [currentSchedulerIndex, setCurrentSchedulerIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)
  const [favoriteNumber, setFavoriteNumber] = useState("")
  const [isGiftHovered, setIsGiftHovered] = useState(false)
  const [isGrayscale, setIsGrayscale] = useState(false)

  useEffect(() => {
    if (!isSchedulerActive || uploadedImages.length === 0) return

    const interval = setInterval(() => {
      const uploadedImagesList = uploadedImages.filter((img) => img.isUploaded)
      if (uploadedImagesList.length === 0) return

      const nextIndex = (currentSchedulerIndex + 1) % uploadedImagesList.length
      setCurrentSchedulerIndex(nextIndex)
      setLivePreviewImage(uploadedImagesList[nextIndex])

      toast({
        title: "Wallpaper Rotated",
        description: `Now showing: ${uploadedImagesList[nextIndex].name}`,
      })
    }, schedulerInterval * 1000)

    return () => clearInterval(interval)
  }, [isSchedulerActive, schedulerInterval, currentSchedulerIndex, uploadedImages, toast])

  const createDefaultAdjustments = (): ImageAdjustments => ({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sharpness: 100,
    hue: 0,
    blur: 0,
    vignette: 0,
    opacity: 100,
  })

  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files || uploadedImages.length >= 20) return

      const remainingSlots = 20 - uploadedImages.length
      const filesToProcess = Array.from(files).slice(0, remainingSlots)

      setIsUploading(true)

      filesToProcess.forEach((file) => {
        if (file.type.startsWith("image/")) {
          const imageId = Math.random().toString(36).substr(2, 9)
          const imageUrl = URL.createObjectURL(file)

          const newImage: UploadedImage = {
            id: imageId,
            url: imageUrl,
            name: file.name,
            size: file.size,
            uploadProgress: 0,
            isUploaded: false,
            adjustments: createDefaultAdjustments(),
            cropMode: "fill",
            filter: "none",
          }

          setUploadedImages((prev) => [...prev, newImage])

          // Simulate upload progress
          let progress = 0
          const progressInterval = setInterval(() => {
            progress += Math.random() * 30
            if (progress >= 100) {
              progress = 100
              clearInterval(progressInterval)
              setUploadedImages((prev) =>
                prev.map((img) => (img.id === imageId ? { ...img, uploadProgress: 100, isUploaded: true } : img)),
              )
              setIsUploading(false)
            } else {
              setUploadedImages((prev) =>
                prev.map((img) => (img.id === imageId ? { ...img, uploadProgress: progress } : img)),
              )
            }
          }, 200)
        }
      })
    },
    [uploadedImages.length],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      handleFileSelect(e.dataTransfer.files)
    },
    [handleFileSelect],
  )

  const updateImageAdjustment = useCallback((imageId: string, adjustment: keyof ImageAdjustments, value: number) => {
    setUploadedImages((prev) =>
      prev.map((img) =>
        img.id === imageId
          ? {
              ...img,
              adjustments: {
                ...img.adjustments,
                [adjustment]: value,
              },
            }
          : img,
      ),
    )
  }, [])

  const updateImageCropMode = useCallback((imageId: string, cropMode: string) => {
    setUploadedImages((prev) => prev.map((img) => (img.id === imageId ? { ...img, cropMode } : img)))
  }, [])

  const updateImageFilter = useCallback((imageId: string, filter: string) => {
    setUploadedImages((prev) => prev.map((img) => (img.id === imageId ? { ...img, filter } : img)))
  }, [])

  const updateImageTextOverlay = useCallback((imageId: string, textSettings: Partial<TextOverlaySettings>) => {
    setUploadedImages((prev) =>
      prev.map((img) => {
        if (img.id === imageId) {
          const currentOverlay = img.textOverlay || {
            text: "",
            fontSize: 48,
            fontFamily: "Arial",
            color: "#ffffff",
            strokeColor: "#000000",
            strokeWidth: 2,
            x: 50,
            y: 50,
            rotation: 0,
            opacity: 90,
          }
          return { ...img, textOverlay: { ...currentOverlay, ...textSettings } }
        }
        return img
      }),
    )
  }, [])

  const updateImageGradientOverlay = useCallback((imageId: string, gradientOverlay: string) => {
    setUploadedImages((prev) => prev.map((img) => (img.id === imageId ? { ...img, gradientOverlay } : img)))
  }, [])

  const scrollGallery = useCallback((direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320
      const currentScroll = scrollContainerRef.current.scrollLeft
      const newScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount
      scrollContainerRef.current.scrollTo({ left: newScroll, behavior: "smooth" })
    }
  }, [])

  const openImageViewer = useCallback((image: UploadedImage) => {
    setSelectedImage(image)
    setIsViewerOpen(true)
  }, [])

  const navigateImage = useCallback(
    (direction: "prev" | "next") => {
      if (!selectedImage) return

      const uploadedImagesList = uploadedImages.filter((img) => img.isUploaded)
      const currentIndex = uploadedImagesList.findIndex((img) => img.id === selectedImage.id)

      if (direction === "prev" && currentIndex > 0) {
        setSelectedImage(uploadedImagesList[currentIndex - 1])
      } else if (direction === "next" && currentIndex < uploadedImagesList.length - 1) {
        setSelectedImage(uploadedImagesList[currentIndex + 1])
      }
    },
    [selectedImage, uploadedImages],
  )

  const generateWallpaper = useCallback(async () => {
    if (!generationPrompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a description for your wallpaper.",
        variant: "destructive",
      })
      return
    }

    if (uploadedImages.length >= 10) {
      toast({
        title: "Gallery Full",
        description: "Please remove some images before generating new ones.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      const targetResolution =
        SCREEN_RESOLUTIONS[userScreenSize as keyof typeof SCREEN_RESOLUTIONS] || SCREEN_RESOLUTIONS["1920x1080"]
      const generatedImageUrl = `/placeholder.svg?height=${targetResolution.height}&width=${targetResolution.width}&query=${encodeURIComponent(`${generationStyle} ${generationPrompt}`)}`

      const generatedImage: UploadedImage = {
        id: Math.random().toString(36).substr(2, 9),
        url: generatedImageUrl,
        name: `Generated: ${generationPrompt.slice(0, 30)}${generationPrompt.length > 30 ? "..." : ""}`,
        size: 1024 * 1024,
        uploadProgress: 100,
        isUploaded: true,
        adjustments: createDefaultAdjustments(),
        cropMode: "fill",
        filter: "none",
        isProcessing: false,
        isGenerated: true,
      }

      await new Promise((resolve) => setTimeout(resolve, 3000))

      setUploadedImages((prev) => [...prev, generatedImage])
      setIsGenerateOpen(false)
      setGenerationPrompt("")
      setGenerationStyle("Abstract")

      toast({
        title: "Wallpaper Generated!",
        description: "Your AI-generated wallpaper has been added to your gallery.",
      })
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate wallpaper. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }, [generationPrompt, generationStyle, userScreenSize, uploadedImages.length, toast])

  const processImageForWallpaper = useCallback(
    async (image: UploadedImage): Promise<string> => {
      return new Promise((resolve) => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        const img = new Image()

        img.crossOrigin = "anonymous"
        img.onload = () => {
          const targetResolution =
            SCREEN_RESOLUTIONS[userScreenSize as keyof typeof SCREEN_RESOLUTIONS] || SCREEN_RESOLUTIONS["1920x1080"]

          canvas.width = targetResolution.width
          canvas.height = targetResolution.height

          if (!ctx) {
            resolve(image.url)
            return
          }

          // Apply crop mode
          let drawX = 0,
            drawY = 0,
            drawWidth = targetResolution.width,
            drawHeight = targetResolution.height

          switch (image.cropMode) {
            case "fill":
              const scaleX = targetResolution.width / img.width
              const scaleY = targetResolution.height / img.height
              const scale = Math.max(scaleX, scaleY)
              drawWidth = img.width * scale
              drawHeight = img.height * scale
              drawX = (targetResolution.width - drawWidth) / 2
              drawY = (targetResolution.height - drawHeight) / 2
              break
            case "fit":
              const fitScale = Math.min(targetResolution.width / img.width, targetResolution.height / img.height)
              drawWidth = img.width * fitScale
              drawHeight = img.height * fitScale
              drawX = (targetResolution.width - drawWidth) / 2
              drawY = (targetResolution.height - drawHeight) / 2
              break
            case "stretch":
              // Use full canvas dimensions (default)
              break
            case "center":
              drawWidth = img.width
              drawHeight = img.height
              drawX = (targetResolution.width - drawWidth) / 2
              drawY = (targetResolution.height - drawHeight) / 2
              break
          }

          // Build filter string with all adjustments
          const filters = [
            `brightness(${image.adjustments.brightness}%)`,
            `contrast(${image.adjustments.contrast}%)`,
            `saturate(${image.adjustments.saturation}%)`,
            `hue-rotate(${image.adjustments.hue}deg)`,
            `blur(${image.adjustments.blur}px)`,
            `opacity(${image.adjustments.opacity}%)`,
          ]

          // Add filter presets
          switch (image.filter) {
            case "vintage":
              filters.push("sepia(0.5)", "contrast(1.2)", "brightness(1.1)")
              break
            case "sepia":
              filters.push("sepia(1)")
              break
            case "neon":
              filters.push("saturate(2)", "contrast(1.5)", "brightness(1.2)")
              break
            case "dark":
              filters.push("brightness(0.7)", "contrast(1.3)")
              break
            case "cool":
              filters.push("hue-rotate(180deg)", "saturate(1.2)")
              break
            case "warm":
              filters.push("hue-rotate(30deg)", "saturate(1.1)")
              break
            case "grayscale":
              filters.push("grayscale(1)")
              break
          }

          ctx.filter = filters.join(" ")

          // Draw the image
          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)

          // Add gradient overlay if specified
          if (image.gradientOverlay && image.gradientOverlay !== "none") {
            ctx.filter = "none" // Reset filter for overlay
            const gradient = ctx.createLinearGradient(0, 0, targetResolution.width, targetResolution.height)

            switch (image.gradientOverlay) {
              case "sunset":
                gradient.addColorStop(0, "rgba(255, 94, 77, 0.3)")
                gradient.addColorStop(1, "rgba(255, 154, 0, 0.3)")
                break
              case "ocean":
                gradient.addColorStop(0, "rgba(0, 119, 190, 0.3)")
                gradient.addColorStop(1, "rgba(0, 180, 216, 0.3)")
                break
              case "forest":
                gradient.addColorStop(0, "rgba(76, 175, 80, 0.3)")
                gradient.addColorStop(1, "rgba(139, 195, 74, 0.3)")
                break
              case "purple":
                gradient.addColorStop(0, "rgba(156, 39, 176, 0.3)")
                gradient.addColorStop(1, "rgba(103, 58, 183, 0.3)")
                break
              case "fire":
                gradient.addColorStop(0, "rgba(244, 67, 54, 0.3)")
                gradient.addColorStop(1, "rgba(255, 193, 7, 0.3)")
                break
            }

            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, targetResolution.width, targetResolution.height)
          }

          if (image.textOverlay && image.textOverlay.text) {
            ctx.filter = "none"
            ctx.save()

            // Set font properties
            ctx.font = `bold ${image.textOverlay.fontSize}px ${image.textOverlay.fontFamily}`
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"

            // Calculate position
            const x = (image.textOverlay.x / 100) * targetResolution.width
            const y = (image.textOverlay.y / 100) * targetResolution.height

            // Apply rotation and opacity
            ctx.translate(x, y)
            ctx.rotate((image.textOverlay.rotation * Math.PI) / 180)
            ctx.globalAlpha = image.textOverlay.opacity / 100

            // Draw text stroke if enabled
            if (image.textOverlay.strokeWidth > 0) {
              ctx.strokeStyle = image.textOverlay.strokeColor
              ctx.lineWidth = image.textOverlay.strokeWidth
              ctx.strokeText(image.textOverlay.text, 0, 0)
            }

            // Draw text fill
            ctx.fillStyle = image.textOverlay.color
            ctx.fillText(image.textOverlay.text, 0, 0)

            ctx.restore()
          }

          // Add vignette effect
          if (image.adjustments.vignette > 0) {
            const vignetteGradient = ctx.createRadialGradient(
              targetResolution.width / 2,
              targetResolution.height / 2,
              0,
              targetResolution.width / 2,
              targetResolution.height / 2,
              Math.max(targetResolution.width, targetResolution.height) / 2,
            )
            vignetteGradient.addColorStop(0, "rgba(0, 0, 0, 0)")
            vignetteGradient.addColorStop(1, `rgba(0, 0, 0, ${image.adjustments.vignette / 100})`)

            ctx.fillStyle = vignetteGradient
            ctx.fillRect(0, 0, targetResolution.width, targetResolution.height)
          }

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(URL.createObjectURL(blob))
              } else {
                resolve(image.url)
              }
            },
            "image/jpeg",
            0.9,
          )
        }

        img.src = image.url
      })
    },
    [userScreenSize],
  )

  const setAsWallpaper = useCallback(
    async (image: UploadedImage) => {
      setUploadedImages((prev) => prev.map((img) => (img.id === image.id ? { ...img, isProcessing: true } : img)))

      try {
        const processedUrl = await processImageForWallpaper(image)

        setUploadedImages((prev) =>
          prev.map((img) => (img.id === image.id ? { ...img, processedUrl, isProcessing: false } : img)),
        )

        setLivePreviewImage(image)

        setTimeout(() => {
          toast({
            title: "Wallpaper Set Successfully!",
            description: `${image.name} has been processed and set as your desktop wallpaper.`,
          })
        }, 500)
      } catch (error) {
        setUploadedImages((prev) => prev.map((img) => (img.id === image.id ? { ...img, isProcessing: false } : img)))

        toast({
          title: "Processing Failed",
          description: "Failed to process the image. Please try again.",
          variant: "destructive",
        })
      }
    },
    [processImageForWallpaper, toast],
  )

  const autoEnhanceImage = useCallback(
    (imageId: string) => {
      setUploadedImages((prev) =>
        prev.map((img) =>
          img.id === imageId
            ? {
                ...img,
                adjustments: {
                  ...img.adjustments,
                  brightness: 110,
                  contrast: 115,
                  saturation: 105,
                  sharpness: 110,
                },
              }
            : img,
        ),
      )

      toast({
        title: "Auto-Enhanced!",
        description: "Image has been automatically enhanced for better quality.",
      })
    },
    [toast],
  )

  const downloadProcessedImage = useCallback(
    async (image: UploadedImage) => {
      if (!image.processedUrl) {
        const processedUrl = await processImageForWallpaper(image)
        const link = document.createElement("a")
        link.href = processedUrl
        link.download = `wallpaper_${image.name}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        const link = document.createElement("a")
        link.href = image.processedUrl
        link.download = `wallpaper_${image.name}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    },
    [processImageForWallpaper],
  )

  const handleGiftClick = async () => {
    if (!favoriteNumber || Number.parseInt(favoriteNumber) < 1 || Number.parseInt(favoriteNumber) > 1084) {
      toast({
        title: "Invalid Number",
        description: "Please enter a number between 1 and 1084",
        variant: "destructive",
      })
      return
    }

    if (uploadedImages.length >= 20) {
      toast({
        title: "Gallery Full",
        description: "Remove some images to add new ones (max 20)",
        variant: "destructive",
      })
      return
    }

    try {
      const [width, height] = userScreenSize.split("x").map(Number)
      const grayscaleParam = isGrayscale ? "?grayscale" : ""
      const imageUrl = `https://picsum.photos/id/${favoriteNumber}/${width}/${height}${grayscaleParam}`

      // Create a new image entry
      const imageId = Math.random().toString(36).substr(2, 9)
      const newImage: UploadedImage = {
        id: imageId,
        url: imageUrl,
        name: `Random-${favoriteNumber}${isGrayscale ? "-grayscale" : ""}.jpg`,
        size: 0,
        uploadProgress: 100,
        isUploaded: true,
        adjustments: createDefaultAdjustments(),
        cropMode: "fill",
        filter: "none",
      }

      setUploadedImages((prev) => [...prev, newImage])
      setIsGiftModalOpen(false)
      setFavoriteNumber("")

      toast({
        title: "Random Image Added!",
        description: `Added image #${favoriteNumber} to your gallery`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch random image",
        variant: "destructive",
      })
    }
  }

  const uploadedImagesList = uploadedImages.filter((img) => img.isUploaded)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="gradient-bg p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Palette className="h-8 w-8 text-white" />
            <h1 className="text-xl font-bold text-white">WallCraft</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              <Monitor className="h-4 w-4 mr-2" />
              {userScreenSize}
            </Button>
            <div className="flex items-center space-x-2">
              <Switch
                checked={isSchedulerActive}
                onCheckedChange={setIsSchedulerActive}
                disabled={uploadedImagesList.length === 0}
              />
              <span className="text-white text-sm">Auto-rotate</span>
            </div>
            <Button variant="ghost" className="text-white hover:bg-white/20">
              Profile
            </Button>
          </div>
        </div>
      </nav>

      {livePreviewImage && (
        <div className="bg-muted/20 border-b border-white/10 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Monitor className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Live Desktop Preview</h3>
                {isSchedulerActive && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Rotating every {schedulerInterval}s</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLivePreviewImage(null)}
                  className="border-white/20 hover:bg-white/10"
                >
                  Clear Preview
                </Button>
                {isSchedulerActive && (
                  <Select
                    value={schedulerInterval.toString()}
                    onValueChange={(value) => setSchedulerInterval(Number(value))}
                  >
                    <SelectTrigger className="w-32 bg-input border-white/20 text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/20">
                      <SelectItem value="10">10 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                      <SelectItem value="300">5 minutes</SelectItem>
                      <SelectItem value="900">15 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
            <div
              className="relative bg-black rounded-lg overflow-hidden"
              style={{ aspectRatio: userScreenSize.replace("x", "/") }}
            >
              <img
                src={livePreviewImage.url || "/placeholder.svg"}
                alt="Desktop Preview"
                className="w-full h-full object-cover"
                style={{
                  filter: `brightness(${livePreviewImage.adjustments.brightness}%) contrast(${livePreviewImage.adjustments.contrast}%) saturate(${livePreviewImage.adjustments.saturation}%) hue-rotate(${livePreviewImage.adjustments.hue}deg) blur(${livePreviewImage.adjustments.blur}px) opacity(${livePreviewImage.adjustments.opacity}%)`,
                }}
              />
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {livePreviewImage.name}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Your Wallpapers</h2>
          <p className="text-muted-foreground">
            Upload and manage your desktop wallpapers ({uploadedImages.length}/20) • Target: {userScreenSize}
          </p>
        </div>

        {/* Upload Area */}
        <Card
          className={`gradient-card mb-8 transition-all duration-200 ${isDragOver ? "ring-2 ring-primary scale-[1.02]" : ""}`}
        >
          <CardContent className="p-8">
            <div className="text-center" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
              <Upload
                className={`h-12 w-12 mx-auto mb-4 transition-colors ${isDragOver ? "text-primary" : "text-primary"}`}
              />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {isDragOver ? "Drop your images here" : "Upload Wallpapers"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {isDragOver ? "Release to upload your images" : "Drag and drop your images here or click to browse"}
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="file-upload"
                disabled={uploadedImages.length >= 20 || isUploading}
              />
              <label htmlFor="file-upload">
                <Button
                  className="gradient-bg border-0 hover:opacity-90 disabled:opacity-50"
                  disabled={uploadedImages.length >= 20 || isUploading}
                  asChild
                >
                  <span>{isUploading ? "Uploading..." : "Choose Files"}</span>
                </Button>
              </label>
              <p className="text-sm text-muted-foreground mt-2">
                Upload up to 20 images (JPG, PNG, WebP) • Max 10MB per file • Auto-resize to {userScreenSize}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Upload Progress */}
        {isUploading && (
          <Card className="gradient-card mb-6">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Upload className="h-5 w-5 text-primary animate-pulse" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground mb-1">Uploading images...</p>
                  <div className="space-y-2">
                    {uploadedImages
                      .filter((img) => !img.isUploaded)
                      .map((image) => (
                        <div key={image.id} className="flex items-center space-x-3">
                          <span className="text-xs text-muted-foreground w-32 truncate">{image.name}</span>
                          <Progress value={image.uploadProgress} className="flex-1" />
                          <span className="text-xs text-muted-foreground w-12">{image.uploadProgress}%</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {uploadedImagesList.length > 0 && (
          <Card className="gradient-card mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground flex items-center">
                  <ImageIcon className="h-5 w-5 mr-2" />
                  Wallpaper Gallery ({uploadedImagesList.length})
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => scrollGallery("left")}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => scrollGallery("right")}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div
                ref={scrollContainerRef}
                className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {uploadedImagesList.map((image) => (
                  <div key={image.id} className="flex-shrink-0 w-96">
                    <Card className="gradient-card border-white/10">
                      <CardContent className="p-4">
                        <div className="aspect-video bg-muted rounded-lg mb-3 overflow-hidden relative group cursor-pointer">
                          <img
                            src={image.url || "/placeholder.svg"}
                            alt={image.name}
                            className="w-full h-full object-cover transition-all duration-300"
                            style={{
                              filter: `brightness(${image.adjustments.brightness}%) contrast(${image.adjustments.contrast}%) saturate(${image.adjustments.saturation}%) hue-rotate(${image.adjustments.hue}deg) blur(${image.adjustments.blur}px) opacity(${image.adjustments.opacity}%)`,
                            }}
                            onClick={() => openImageViewer(image)}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                            <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          {image.processedUrl && (
                            <div className="absolute top-2 right-2">
                              <CheckCircle className="h-5 w-5 text-green-500 bg-background/80 rounded-full" />
                            </div>
                          )}
                          {image.isGenerated && (
                            <div className="absolute top-2 left-2">
                              <div className="flex items-center space-x-1 bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs">
                                <Wand2 className="h-3 w-3" />
                                <span>AI</span>
                              </div>
                            </div>
                          )}
                          {livePreviewImage?.id === image.id && (
                            <div className="absolute bottom-2 left-2">
                              <div className="flex items-center space-x-1 bg-green-500/90 text-white px-2 py-1 rounded-full text-xs">
                                <Monitor className="h-3 w-3" />
                                <span>Live</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <h4 className="font-medium text-foreground mb-3 truncate">{image.name}</h4>

                        <Tabs defaultValue="basic" className="w-full">
                          <TabsList className="grid w-full grid-cols-4 mb-4">
                            <TabsTrigger value="basic" className="text-xs">
                              Basic
                            </TabsTrigger>
                            <TabsTrigger value="advanced" className="text-xs">
                              Advanced
                            </TabsTrigger>
                            <TabsTrigger value="style" className="text-xs">
                              Style
                            </TabsTrigger>
                            <TabsTrigger value="overlay" className="text-xs">
                              Overlay
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="basic" className="space-y-4">
                            {/* Brightness Control */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <Label className="text-sm text-muted-foreground flex items-center">
                                  <Sun className="h-3 w-3 mr-1" />
                                  Brightness
                                </Label>
                                <span className="text-xs text-muted-foreground">{image.adjustments.brightness}%</span>
                              </div>
                              <Slider
                                value={[image.adjustments.brightness]}
                                onValueChange={(value) => updateImageAdjustment(image.id, "brightness", value[0])}
                                max={200}
                                min={20}
                                step={5}
                                className="w-full"
                              />
                            </div>

                            {/* Contrast Control */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <Label className="text-sm text-muted-foreground flex items-center">
                                  <Contrast className="h-3 w-3 mr-1" />
                                  Contrast
                                </Label>
                                <span className="text-xs text-muted-foreground">{image.adjustments.contrast}%</span>
                              </div>
                              <Slider
                                value={[image.adjustments.contrast]}
                                onValueChange={(value) => updateImageAdjustment(image.id, "contrast", value[0])}
                                max={200}
                                min={50}
                                step={5}
                                className="w-full"
                              />
                            </div>

                            {/* Saturation Control */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <Label className="text-sm text-muted-foreground flex items-center">
                                  <Droplets className="h-3 w-3 mr-1" />
                                  Saturation
                                </Label>
                                <span className="text-xs text-muted-foreground">{image.adjustments.saturation}%</span>
                              </div>
                              <Slider
                                value={[image.adjustments.saturation]}
                                onValueChange={(value) => updateImageAdjustment(image.id, "saturation", value[0])}
                                max={200}
                                min={0}
                                step={5}
                                className="w-full"
                              />
                            </div>
                          </TabsContent>

                          <TabsContent value="advanced" className="space-y-4">
                            {/* Sharpness Control */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <Label className="text-sm text-muted-foreground flex items-center">
                                  <Focus className="h-3 w-3 mr-1" />
                                  Sharpness
                                </Label>
                                <span className="text-xs text-muted-foreground">{image.adjustments.sharpness}%</span>
                              </div>
                              <Slider
                                value={[image.adjustments.sharpness]}
                                onValueChange={(value) => updateImageAdjustment(image.id, "sharpness", value[0])}
                                max={200}
                                min={50}
                                step={5}
                                className="w-full"
                              />
                            </div>

                            {/* Hue Control */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <Label className="text-sm text-muted-foreground flex items-center">
                                  <Paintbrush className="h-3 w-3 mr-1" />
                                  Hue Shift
                                </Label>
                                <span className="text-xs text-muted-foreground">{image.adjustments.hue}°</span>
                              </div>
                              <Slider
                                value={[image.adjustments.hue]}
                                onValueChange={(value) => updateImageAdjustment(image.id, "hue", value[0])}
                                max={180}
                                min={-180}
                                step={5}
                                className="w-full"
                              />
                            </div>

                            {/* Blur Control */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <Label className="text-sm text-muted-foreground flex items-center">
                                  <Blur className="h-3 w-3 mr-1" />
                                  Blur
                                </Label>
                                <span className="text-xs text-muted-foreground">{image.adjustments.blur}px</span>
                              </div>
                              <Slider
                                value={[image.adjustments.blur]}
                                onValueChange={(value) => updateImageAdjustment(image.id, "blur", value[0])}
                                max={20}
                                min={0}
                                step={1}
                                className="w-full"
                              />
                            </div>

                            {/* Vignette Control */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <Label className="text-sm text-muted-foreground flex items-center">
                                  <Circle className="h-3 w-3 mr-1" />
                                  Vignette
                                </Label>
                                <span className="text-xs text-muted-foreground">{image.adjustments.vignette}%</span>
                              </div>
                              <Slider
                                value={[image.adjustments.vignette]}
                                onValueChange={(value) => updateImageAdjustment(image.id, "vignette", value[0])}
                                max={100}
                                min={0}
                                step={5}
                                className="w-full"
                              />
                            </div>

                            {/* Opacity Control */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <Label className="text-sm text-muted-foreground flex items-center">
                                  <Layers className="h-3 w-3 mr-1" />
                                  Opacity
                                </Label>
                                <span className="text-xs text-muted-foreground">{image.adjustments.opacity}%</span>
                              </div>
                              <Slider
                                value={[image.adjustments.opacity]}
                                onValueChange={(value) => updateImageAdjustment(image.id, "opacity", value[0])}
                                max={100}
                                min={10}
                                step={5}
                                className="w-full"
                              />
                            </div>
                          </TabsContent>

                          <TabsContent value="style" className="space-y-4">
                            {/* Crop Mode */}
                            <div>
                              <Label className="text-sm text-muted-foreground flex items-center mb-2">
                                <Crop className="h-3 w-3 mr-1" />
                                Crop & Fit
                              </Label>
                              <Select
                                value={image.cropMode}
                                onValueChange={(value) => updateImageCropMode(image.id, value)}
                              >
                                <SelectTrigger className="bg-input border-white/20 text-foreground">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-card border-white/20">
                                  {CROP_MODES.map((mode) => (
                                    <SelectItem key={mode.value} value={mode.value}>
                                      {mode.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Filter Presets */}
                            <div>
                              <Label className="text-sm text-muted-foreground flex items-center mb-2">
                                <Filter className="h-3 w-3 mr-1" />
                                Filter Preset
                              </Label>
                              <Select
                                value={image.filter}
                                onValueChange={(value) => updateImageFilter(image.id, value)}
                              >
                                <SelectTrigger className="bg-input border-white/20 text-foreground">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-card border-white/20">
                                  {FILTER_PRESETS.map((filter) => (
                                    <SelectItem key={filter.value} value={filter.value}>
                                      {filter.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* AI Auto-Enhance Button */}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => autoEnhanceImage(image.id)}
                              className="w-full border-white/20 hover:bg-white/10"
                            >
                              <Wand2 className="h-3 w-3 mr-2" />
                              AI Auto-Enhance
                            </Button>
                          </TabsContent>

                          <TabsContent value="overlay" className="space-y-4">
                            {/* Gradient Overlay */}
                            <div>
                              <Label className="text-sm text-muted-foreground flex items-center mb-2">
                                <Layers className="h-3 w-3 mr-1" />
                                Gradient Overlay
                              </Label>
                              <Select
                                value={image.gradientOverlay || "none"}
                                onValueChange={(value) => updateImageGradientOverlay(image.id, value)}
                              >
                                <SelectTrigger className="bg-input border-white/20 text-foreground">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-card border-white/20">
                                  {GRADIENT_OVERLAYS.map((gradient) => (
                                    <SelectItem key={gradient.value} value={gradient.value}>
                                      {gradient.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-3">
                              <Label className="text-sm text-muted-foreground flex items-center">
                                <Type className="h-3 w-3 mr-1" />
                                Text Overlay
                              </Label>

                              {/* Text Input */}
                              <Input
                                placeholder="Enter text to overlay..."
                                value={image.textOverlay?.text || ""}
                                onChange={(e) => updateImageTextOverlay(image.id, { text: e.target.value })}
                                className="bg-input border-white/20 text-foreground placeholder:text-muted-foreground"
                              />

                              {image.textOverlay?.text && (
                                <div className="space-y-3 pt-2 border-t border-white/10">
                                  {/* Font Family */}
                                  <div>
                                    <Label className="text-xs text-muted-foreground mb-1 block">Font Family</Label>
                                    <Select
                                      value={image.textOverlay.fontFamily}
                                      onValueChange={(value) => updateImageTextOverlay(image.id, { fontFamily: value })}
                                    >
                                      <SelectTrigger className="bg-input border-white/20 text-foreground h-8">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent className="bg-card border-white/20">
                                        {FONT_FAMILIES.map((font) => (
                                          <SelectItem key={font.value} value={font.value}>
                                            {font.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  {/* Font Size */}
                                  <div>
                                    <div className="flex items-center justify-between mb-1">
                                      <Label className="text-xs text-muted-foreground">Font Size</Label>
                                      <span className="text-xs text-muted-foreground">
                                        {image.textOverlay.fontSize}px
                                      </span>
                                    </div>
                                    <Slider
                                      value={[image.textOverlay.fontSize]}
                                      onValueChange={(value) =>
                                        updateImageTextOverlay(image.id, { fontSize: value[0] })
                                      }
                                      max={120}
                                      min={12}
                                      step={2}
                                      className="w-full"
                                    />
                                  </div>

                                  {/* Text Color */}
                                  <div>
                                    <Label className="text-xs text-muted-foreground mb-1 block">Text Color</Label>
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="color"
                                        value={image.textOverlay.color}
                                        onChange={(e) => updateImageTextOverlay(image.id, { color: e.target.value })}
                                        className="w-8 h-8 rounded border border-white/20 bg-transparent cursor-pointer"
                                      />
                                      <Input
                                        value={image.textOverlay.color}
                                        onChange={(e) => updateImageTextOverlay(image.id, { color: e.target.value })}
                                        className="bg-input border-white/20 text-foreground h-8 text-xs"
                                        placeholder="#ffffff"
                                      />
                                    </div>
                                  </div>

                                  {/* Stroke Settings */}
                                  <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground">Text Stroke</Label>
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="color"
                                        value={image.textOverlay.strokeColor}
                                        onChange={(e) =>
                                          updateImageTextOverlay(image.id, { strokeColor: e.target.value })
                                        }
                                        className="w-6 h-6 rounded border border-white/20 bg-transparent cursor-pointer"
                                      />
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                          <span className="text-xs text-muted-foreground">Width</span>
                                          <span className="text-xs text-muted-foreground">
                                            {image.textOverlay.strokeWidth}px
                                          </span>
                                        </div>
                                        <Slider
                                          value={[image.textOverlay.strokeWidth]}
                                          onValueChange={(value) =>
                                            updateImageTextOverlay(image.id, { strokeWidth: value[0] })
                                          }
                                          max={10}
                                          min={0}
                                          step={1}
                                          className="w-full"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Position Controls */}
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <div className="flex items-center justify-between mb-1">
                                        <Label className="text-xs text-muted-foreground">X Position</Label>
                                        <span className="text-xs text-muted-foreground">{image.textOverlay.x}%</span>
                                      </div>
                                      <Slider
                                        value={[image.textOverlay.x]}
                                        onValueChange={(value) => updateImageTextOverlay(image.id, { x: value[0] })}
                                        max={100}
                                        min={0}
                                        step={1}
                                        className="w-full"
                                      />
                                    </div>
                                    <div>
                                      <div className="flex items-center justify-between mb-1">
                                        <Label className="text-xs text-muted-foreground">Y Position</Label>
                                        <span className="text-xs text-muted-foreground">{image.textOverlay.y}%</span>
                                      </div>
                                      <Slider
                                        value={[image.textOverlay.y]}
                                        onValueChange={(value) => updateImageTextOverlay(image.id, { y: value[0] })}
                                        max={100}
                                        min={0}
                                        step={1}
                                        className="w-full"
                                      />
                                    </div>
                                  </div>

                                  {/* Rotation and Opacity */}
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <div className="flex items-center justify-between mb-1">
                                        <Label className="text-xs text-muted-foreground">Rotation</Label>
                                        <span className="text-xs text-muted-foreground">
                                          {image.textOverlay.rotation}°
                                        </span>
                                      </div>
                                      <Slider
                                        value={[image.textOverlay.rotation]}
                                        onValueChange={(value) =>
                                          updateImageTextOverlay(image.id, { rotation: value[0] })
                                        }
                                        max={180}
                                        min={-180}
                                        step={5}
                                        className="w-full"
                                      />
                                    </div>
                                    <div>
                                      <div className="flex items-center justify-between mb-1">
                                        <Label className="text-xs text-muted-foreground">Opacity</Label>
                                        <span className="text-xs text-muted-foreground">
                                          {image.textOverlay.opacity}%
                                        </span>
                                      </div>
                                      <Slider
                                        value={[image.textOverlay.opacity]}
                                        onValueChange={(value) =>
                                          updateImageTextOverlay(image.id, { opacity: value[0] })
                                        }
                                        max={100}
                                        min={10}
                                        step={5}
                                        className="w-full"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </TabsContent>
                        </Tabs>
                        <div className="flex space-x-2 mt-4">
                          <Button
                            size="sm"
                            className="flex-1 gradient-bg border-0 hover:opacity-90"
                            onClick={() => setAsWallpaper(image)}
                            disabled={image.isProcessing}
                          >
                            {image.isProcessing ? (
                              <>
                                <Settings className="h-3 w-3 mr-1 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              "Set as Wallpaper"
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => downloadProcessedImage(image)}
                            className="border-white/20 hover:bg-white/10"
                            title="Download processed wallpaper"
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openImageViewer(image)}
                            className="border-white/20 hover:bg-white/10"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Placeholder when no images */}
        {uploadedImagesList.length === 0 && (
          <Card className="gradient-card opacity-50">
            <CardContent className="p-12 text-center">
              <Monitor className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No wallpapers yet</h3>
              <p className="text-muted-foreground mb-4">Upload your first wallpaper or generate one with AI</p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent" disabled>
                  Upload Images Above
                </Button>
                {/*                 <Button
                  variant="outline"
                  className="border-white/20 hover:bg-white/10 bg-transparent"
                  onClick={() => setIsGenerateOpen(true)}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate AI Wallpaper
                </Button> */}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Generate Button */}
        <div className="fixed bottom-6 right-6">
          <Button
            className={`gradient-bg border-0 hover:opacity-90 shadow-lg h-14 px-6 transition-transform duration-300 ${
              isGiftHovered ? "scale-110" : "scale-100"
            }`}
            onClick={() => setIsGiftModalOpen(true)}
            onMouseEnter={() => setIsGiftHovered(true)}
            onMouseLeave={() => setIsGiftHovered(false)}
            disabled={uploadedImages.length >= 20}
          >
            <Gift className="h-5 w-5 mr-2" />
            Random Image
          </Button>
        </div>
      </main>

      <Dialog open={isGiftModalOpen} onOpenChange={setIsGiftModalOpen}>
        <DialogContent className="max-w-md bg-background/95 backdrop-blur-lg border-white/20">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center">
              <Gift className="h-5 w-5 mr-2" />
              Get Random Image
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 p-4">
            <div className="space-y-2">
              <Label htmlFor="favorite-number" className="text-foreground">
                What's your favorite number? (1-1084)
              </Label>
              <Input
                id="favorite-number"
                type="number"
                min="1"
                max="1084"
                placeholder="Enter a number between 1 and 1084"
                value={favoriteNumber}
                onChange={(e) => setFavoriteNumber(e.target.value)}
                className="bg-input border-white/20 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="grayscale"
                checked={isGrayscale}
                onChange={(e) => setIsGrayscale(e.target.checked)}
                className="rounded border-white/20"
              />
              <Label htmlFor="grayscale" className="text-foreground text-sm">
                Grayscale image
              </Label>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Monitor className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Resolution: {userScreenSize}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Gallery: {uploadedImages.length}/20</span>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsGiftModalOpen(false)}
                className="border-white/20 hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleGiftClick}
                disabled={
                  !favoriteNumber || Number.parseInt(favoriteNumber) < 1 || Number.parseInt(favoriteNumber) > 1084
                }
                className="gradient-bg border-0 hover:opacity-90"
              >
                <Gift className="h-4 w-4 mr-2" />
                Get Image
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="max-w-4xl w-full h-[80vh] bg-background/95 backdrop-blur-lg border-white/20">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="truncate">{selectedImage?.name}</span>
                {selectedImage?.isGenerated && (
                  <div className="flex items-center space-x-1 bg-primary/20 text-primary px-2 py-1 rounded-full text-xs">
                    <Wand2 className="h-3 w-3" />
                    <span>AI Generated</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateImage("prev")}
                  disabled={!selectedImage || uploadedImagesList.findIndex((img) => img.id === selectedImage.id) === 0}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {selectedImage ? uploadedImagesList.findIndex((img) => img.id === selectedImage.id) + 1 : 0} of{" "}
                  {uploadedImagesList.length}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateImage("next")}
                  disabled={
                    !selectedImage ||
                    uploadedImagesList.findIndex((img) => img.id === selectedImage.id) === uploadedImagesList.length - 1
                  }
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>

          {selectedImage && (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="relative max-w-full max-h-full">
                <img
                  src={selectedImage.url || "/placeholder.svg"}
                  alt={selectedImage.name}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  style={{
                    filter: `brightness(${selectedImage.adjustments.brightness}%) contrast(${selectedImage.adjustments.contrast}%) saturate(${selectedImage.adjustments.saturation}%) hue-rotate(${selectedImage.adjustments.hue}deg) blur(${selectedImage.adjustments.blur}px) opacity(${selectedImage.adjustments.opacity}%)`,
                  }}
                />
              </div>
            </div>
          )}

          {selectedImage && (
            <div className="flex items-center justify-between p-4 border-t border-white/10">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Brightness: {selectedImage.adjustments.brightness}%
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Monitor className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Target: {userScreenSize}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => downloadProcessedImage(selectedImage)}
                  className="border-white/20 hover:bg-white/10"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  className="gradient-bg border-0 hover:opacity-90"
                  onClick={() => setAsWallpaper(selectedImage)}
                  disabled={selectedImage.isProcessing}
                >
                  {selectedImage.isProcessing ? (
                    <>
                      <Settings className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Set as Wallpaper"
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
