export const APK_CONFIG = {
  version: "1.0.0",
  fileName: "AR-DUINO-M.apk",
  fileSizeBytes: 128824386,
  fileSizeDisplay: "123 MB",
  minAndroidVersion: "Android 8.0+ (Oreo)",
  engine: "Unity 3D + Vuforia AR Engine",
  releaseTag: "v1.0.0",
  // Primary direct download URL from official GitHub Release asset
  downloadUrl:
    process.env.NEXT_PUBLIC_APK_DOWNLOAD_URL ||
    "https://github.com/EngrPrenz/ar-duino-m-website/releases/download/v1.0.0/AR-DUINO-M.apk",
  releasePageUrl:
    "https://github.com/EngrPrenz/ar-duino-m-website/releases/tag/v1.0.0",
  officialSiteUrl: "https://ar-duino-m.vercel.app",
  directDownloadPath: "/download",
} as const;
