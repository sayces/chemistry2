'use client';

import { usePlatformStore } from '@/shared/store/usePlatformStore'
import { useEffect } from 'react'

export const PlatformProvider = () => {
  const init = usePlatformStore((state) => state.init)

  useEffect(() => {
    init()
  }, [init])

  return null
}