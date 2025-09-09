"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
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
  Clock,
  Gift,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

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

interface UploadedImage {
  id: string
  file: File
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
  isFromPicsum?: boolean
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

interface DashboardProps {
  userScreenSize: string
}

function Dashboard({ userScreenSize }: DashboardProps) {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [viewerImageId, setViewerImageId] = useState<string | null>(null)
  const [isGiftOpen, setIsGiftOpen] = useState(false)
  const [favoriteNumber, setFavoriteNumber] = useState("")
  const [isGrayscale, setIsGrayscale] = useState(false)
  const [giftButtonScale, setGiftButtonScale] = useState(1)
  const { toast } = useToast()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [generationPrompt, setGenerationPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStyle, setGenerationStyle] = useState("Abstract")
  const [isGenerateOpen, setIsGenerateOpen] = useState(false)
  const [livePreviewImage, setLivePreviewImage] = useState<UploadedImage | null>(null)
  const [isSchedulerActive, setIsSchedulerActive] = useState(false)
  const [schedulerInterval, setSchedulerInterval] = useState(60)

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
            file,
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

  const handleGiftGenerate = async () => {
    const num = Number.parseInt(favoriteNumber)
    if (!num || num < 1 || num > 1084) {
      toast({
        title: "Invalid Number",
        description: "Please enter a number between 1 and 1084.",
        variant: "destructive",
      })
      return
    }

    if (uploadedImages.length >= 20) {
      toast({
        title: "Gallery Full",
        description: "Please remove some images before adding new ones.",
        variant: "destructive",
      })
      return
    }

    const targetResolution =
      SCREEN_RESOLUTIONS[userScreenSize as keyof typeof SCREEN_RESOLUTIONS] || SCREEN_RESOLUTIONS["1920x1080"]

    const grayscaleParam = isGrayscale ? "?grayscale" : ""
    const picsumUrl = `https://picsum.photos/id/${num}/${targetResolution.width}/${targetResolution.height}${grayscaleParam}`

    const imageId = Math.random().toString(36).substr(2, 9)
    const newImage: UploadedImage = {
      id: imageId,
      file: new File([], `picsum-${num}.jpg`, { type: "image/jpeg" }),
      url: picsumUrl,
      name: `Random Image ${num}${isGrayscale ? " (Grayscale)" : ""}`,
      size: 0,
      uploadProgress: 100,
      isUploaded: true,
      adjustments: createDefaultAdjustments(),
      cropMode: "fill",
      filter: "none",
      isFromPicsum: true,
    }

    setUploadedImages((prev) => [...prev, newImage])
    setIsGiftOpen(false)
    setFavoriteNumber("")

    toast({
      title: "Random Image Added!",
      description: `Added image #${num} to your collection.`,
    })
  }

  const scrollGallery = useCallback((direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320
      const currentScroll = scrollContainerRef.current.scrollLeft
      const newScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount
      scrollContainerRef.current.scrollTo({ left: newScroll, behavior: "smooth" })
    }
  }, [])

  const openImageViewer = useCallback((image: UploadedImage) => {
    setSelectedImageId(image.id)
    setViewerImageId(image.id)
  }, [])

  const navigateImage = useCallback(
    (direction: "prev" | "next") => {
      if (!viewerImageId) return

      const uploadedImagesList = uploadedImages.filter((img) => img.isUploaded)
      const currentIndex = uploadedImagesList.findIndex((img) => img.id === viewerImageId)

      if (direction === "prev" && currentIndex > 0) {
        setViewerImageId(uploadedImagesList[currentIndex - 1].id)
      } else if (direction === "next" && currentIndex < uploadedImagesList.length - 1) {
        setViewerImageId(uploadedImagesList[currentIndex + 1].id)
      }
    },
    [viewerImageId, uploadedImages],
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
        file: new File([], `generated_${Date.now()}.jpg`, { type: "image/jpeg" }),
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
    [processImageForWallpaper, toast, setLivePreviewImage],
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

  const uploadedImagesList = uploadedImages.filter((img) => img.isUploaded)

  return (
    <main className="min-h-screen gradient-bg p-6 relative overflow-hidden">
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

      {uploadedImages.length === 0 ? (
        <Card className="anime-card magical-glow max-w-2xl mx-auto">
          <CardContent className="p-12 text-center">
            <div
              className="border-2 border-dashed border-white/30 rounded-lg p-12 transition-all duration-300 hover:border-white/50 hover:bg-white/5"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="h-16 w-16 mx-auto mb-6 text-white/60" />
              <h3 className="text-2xl font-bold mb-4 text-white">Upload Wallpapers</h3>
              <p className="text-white/80 mb-6 text-lg">
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
      ) : (
        <ImageGallery
          images={uploadedImages}
          onImageSelect={setSelectedImageId}
          onImageRemove={(imageId) => {
            setUploadedImages((prev) => prev.filter((img) => img.id !== imageId))
            if (selectedImageId === imageId) {
              setSelectedImageId(null)
            }
          }}
          onImageUpdate={(imageId, updates) => {
            setUploadedImages((prev) => prev.map((img) => (img.id === imageId ? { ...img, ...updates } : img)))
          }}
          onImageView={setViewerImageId}
          userScreenSize={userScreenSize}
          onAddMore={() => document.getElementById("file-upload-more")?.click()}
          maxImages={20}
        />
      )}

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
        id="file-upload-more"
        disabled={uploadedImages.length >= 20 || isUploading}
      />

      <div className="fixed bottom-6 right-6">
        <Button
          className="gradient-bg border-0 hover:opacity-90 shadow-lg h-14 w-14 rounded-full p-0 transition-transform duration-200"
          onClick={() => setIsGiftOpen(true)}
          disabled={uploadedImages.length >= 20}
          onMouseEnter={() => setGiftButtonScale(1.1)}
          onMouseLeave={() => setGiftButtonScale(1)}
          style={{ transform: `scale(${giftButtonScale})` }}
        >
          <Gift className="h-6 w-6" />
        </Button>
      </div>

      <Dialog open={isGiftOpen} onOpenChange={setIsGiftOpen}>
        <DialogContent className="max-w-md bg-background/95 backdrop-blur-lg border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Get Random Wallpaper
            </DialogTitle>
            <DialogDescription className="text-white/80">
              Enter your favorite number (1-1084) to get a random wallpaper from Picsum Photos
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="favorite-number" className="text-white">
                Favorite Number (1-1084)
              </Label>
              <Input
                id="favorite-number"
                type="number"
                min="1"
                max="1084"
                value={favoriteNumber}
                onChange={(e) => setFavoriteNumber(e.target.value)}
                placeholder="Enter a number..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="grayscale"
                checked={isGrayscale}
                onCheckedChange={(checked) => setIsGrayscale(checked as boolean)}
              />
              <Label htmlFor="grayscale" className="text-white">
                Grayscale
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGiftOpen(false)} className="border-white/20 text-white">
              Cancel
            </Button>
            <Button onClick={handleGiftGenerate} className="gradient-bg border-0">
              Get Random Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={viewerImageId !== null} onOpenChange={() => setViewerImageId(null)}>
        <DialogContent className="max-w-4xl w-full h-[80vh] bg-background/95 backdrop-blur-lg border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="truncate">{uploadedImages.find((img) => img.id === viewerImageId)?.name}</span>
                {uploadedImages.find((img) => img.id === viewerImageId)?.isGenerated && (
                  <div className="flex items-center space-x-1 bg-primary/20 text-primary px-2 py-1 rounded-full text-xs">
                    <Wand2 className="h-3 w-3" />
                    <span>AI Generated</span>
                  </div>
                )}
                {uploadedImages.find((img) => img.id === viewerImageId)?.isFromPicsum && (
                  <div className="flex items-center space-x-1 bg-green-500/20 text-green-500 px-2 py-1 rounded-full text-xs">
                    <ImageIcon className="h-3 w-3" />
                    <span>Picsum</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateImage("prev")}
                  disabled={!viewerImageId || uploadedImages.findIndex((img) => img.id === viewerImageId) === 0}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {viewerImageId ? uploadedImages.findIndex((img) => img.id === viewerImageId) + 1 : 0} of{" "}
                  {uploadedImages.length}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateImage("next")}
                  disabled={
                    !viewerImageId ||
                    uploadedImages.findIndex((img) => img.id === viewerImageId) === uploadedImages.length - 1
                  }
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>

          {viewerImageId && (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="relative max-w-full max-h-full">
                <img
                  src={uploadedImages.find((img) => img.id === viewerImageId)?.url || "/placeholder.svg"}
                  alt={uploadedImages.find((img) => img.id === viewerImageId)?.name}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  style={{
                    filter: `brightness(${uploadedImages.find((img) => img.id === viewerImageId)?.adjustments.brightness}%) contrast(${uploadedImages.find((img) => img.id === viewerImageId)?.adjustments.contrast}%) saturate(${uploadedImages.find((img) => img.id === viewerImageId)?.adjustments.saturation}%) hue-rotate(${uploadedImages.find((img) => img.id === viewerImageId)?.adjustments.hue}deg) blur(${uploadedImages.find((img) => img.id === viewerImageId)?.adjustments.blur}px) opacity(${uploadedImages.find((img) => img.id === viewerImageId)?.adjustments.opacity}%)`,
                  }}
                />
              </div>
            </div>
          )}

          {viewerImageId && (
            <div className="flex items-center justify-between p-4 border-t border-white/10">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Brightness: {uploadedImages.find((img) => img.id === viewerImageId)?.adjustments.brightness}%
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
                  onClick={() => downloadProcessedImage(uploadedImages.find((img) => img.id === viewerImageId)!)}
                  className="border-white/20 hover:bg-white/10"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  className="gradient-bg border-0 hover:opacity-90"
                  onClick={() => setAsWallpaper(uploadedImages.find((img) => img.id === viewerImageId)!)}
                >
                  Set as Wallpaper
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}

interface ImageGalleryProps {
  images: UploadedImage[]
  onImageSelect: (imageId: string | null) => void
  onImageRemove: (imageId: string) => void
  onImageUpdate: (imageId: string, updates: Partial<UploadedImage>) => void
  onImageView: (imageId: string) => void
  userScreenSize: string
  onAddMore: () => void
  maxImages: number
}

function ImageGallery({
  images,
  onImageSelect,
  onImageRemove,
  onImageUpdate,
  onImageView,
  userScreenSize,
  onAddMore,
  maxImages,
}: ImageGalleryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollGallery = useCallback((direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320
      const currentScroll = scrollContainerRef.current.scrollLeft
      const newScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount
      scrollContainerRef.current.scrollTo({ left: newScroll, behavior: "smooth" })
    }
  }, [])

  return (
    <Card className="anime-card magical-glow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <ImageIcon className="h-5 w-5 mr-2" />
            Wallpaper Gallery ({images.length})
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
          {images.map((image) => (
            <div key={image.id} className="flex-shrink-0 w-96">
              <WallpaperCard
                image={image}
                onSelect={onImageSelect}
                onRemove={onImageRemove}
                onUpdate={onImageUpdate}
                onImageView={onImageView}
                userScreenSize={userScreenSize}
              />
            </div>
          ))}
          {images.length < maxImages && (
            <div className="flex-shrink-0 w-96 flex items-center justify-center">
              <Button variant="outline" className="w-full h-full bg-transparent" onClick={onAddMore}>
                Add More
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface WallpaperCardProps {
  image: UploadedImage
  onSelect: (imageId: string | null) => void
  onRemove: (imageId: string) => void
  onUpdate: (imageId: string, updates: Partial<UploadedImage>) => void
  onImageView: (imageId: string) => void
  userScreenSize: string
}

function WallpaperCard({ image, onSelect, onRemove, onUpdate, onImageView, userScreenSize }: WallpaperCardProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

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
      setIsProcessing(true)

      try {
        const processedUrl = await processImageForWallpaper(image)

        onUpdate(image.id, { processedUrl })

        setTimeout(() => {
          toast({
            title: "Wallpaper Set Successfully!",
            description: `${image.name} has been processed and set as your desktop wallpaper.`,
          })
        }, 500)
      } catch (error) {
        toast({
          title: "Processing Failed",
          description: "Failed to process the image. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsProcessing(false)
      }
    },
    [processImageForWallpaper, toast, onUpdate],
  )

  return (
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
            onClick={() => onImageView(image.id)}
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
          {image.isFromPicsum && (
            <div className="absolute top-2 left-2">
              <div className="flex items-center space-x-1 bg-green-500/90 text-white px-2 py-1 rounded-full text-xs">
                <ImageIcon className="h-3 w-3" />
                <span>Picsum</span>
              </div>
            </div>
          )}
        </div>

        <h4 className="font-medium text-white mb-3 truncate">{image.name}</h4>

        <div className="flex space-x-2 mt-4">
          <Button
            size="sm"
            className="flex-1 gradient-bg border-0 hover:opacity-90"
            onClick={() => setAsWallpaper(image)}
            disabled={isProcessing}
          >
            {isProcessing ? (
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
            onClick={() => onRemove(image.id)}
            className="border-white/20 hover:bg-white/10"
            title="Remove wallpaper"
          >
            <Download className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onImageView(image.id)}
            className="border-white/20 hover:bg-white/10"
          >
            <Eye className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
