import {
    Entity, PrimaryGeneratedColumn, Column,
    CreateDateColumn, UpdateDateColumn, ManyToOne
  } from 'typeorm';
  import { User } from './User';
  
  @Entity('sessions')
  export class Session {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Column()
    token!: string;
  
    @Column({ default: false })
    is_expired!: boolean;
  
    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  
    @ManyToOne(() => User, user => user.sessions)
    user!: User;
  }
  