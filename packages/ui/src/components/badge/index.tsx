import React from 'react'
import classNames from 'classnames'
import styles from './styles/styles.module.scss'
import { BadgeColorsType } from '../../@types/badges/colors'
import { BadgeVariantsType } from '../../@types/badges/variants'

export interface BadgeProps {
  readonly title: string
  readonly variant?: BadgeVariantsType
  readonly color?: BadgeColorsType
  readonly className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  title,
  variant = 'solid',
  color = 'primary',
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={classNames(
        styles['badge'],
        styles['badge-' + color],
        styles['badge-' + variant],
        className
      )}
    >
      {title}
    </div>
  )
}
