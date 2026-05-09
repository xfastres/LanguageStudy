import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('content')
export class ContentEntity {
  @PrimaryColumn('uuid')
  id: string = uuidv4()

  @Column()
  title: string

  @Column({ nullable: true })
  description: string

  @Column({ type: 'enum', enum: ['en', 'ja', 'ko'], default: 'en' })
  language: 'en' | 'ja' | 'ko'

  @Column({ type: 'smallint', default: 0 })
  level: number

  @Column()
  videoUrl: string

  @Column({ nullable: true })
  thumbnailUrl: string

  @Column({ nullable: true })
  subtitleUrl: string

  @Column()
  durationSeconds: number

  @Column({ type: 'jsonb' })
  features: Record<string, number>

  @Column({ type: 'simple-array', nullable: true })
  tags: string[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
