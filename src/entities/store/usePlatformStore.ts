'use client'

import { create } from 'zustand'

type DeviceType = 'mobile' | 'tablet' | 'desktop'

interface PlatformState {
  width: number
  height: number
  device: DeviceType
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  setSize: (width: number, height: number) => void
  init: () => void
}

const getDeviceType = (width: number): DeviceType => {
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

export const usePlatformStore = create<PlatformState>((set) => ({
  width: 0,
  height: 0,
  device: 'desktop',
  isMobile: false,
  isTablet: false,
  isDesktop: true,

  setSize: (width, height) => {
    const device = getDeviceType(width)

    set({
      width,
      height,
      device,
      isMobile: device === 'mobile',
      isTablet: device === 'tablet',
      isDesktop: device === 'desktop',
    })
  },

  init: () => {
    if (typeof window === 'undefined') return

    const updateSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const device = getDeviceType(width)

      set({
        width,
        height,
        device,
        isMobile: device === 'mobile',
        isTablet: device === 'tablet',
        isDesktop: device === 'desktop',
      })
    }

    updateSize()
    window.addEventListener('resize', updateSize)
  },
}))