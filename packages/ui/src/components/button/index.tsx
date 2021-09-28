import React, { ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'
import styles from './styles/styles.module.scss'
import { ButtonColorsType } from '../../@types/buttons/colors'
import { ButtonVariantsType } from '../../@types/buttons/variants'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariantsType
  readonly color?: ButtonColorsType
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'solid',
  color = 'primary',
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(
        styles['button'],
        styles['button-' + color],
        styles['button-' + variant],
        className
      )}
    >
      {children}
    </button>
  )
}
