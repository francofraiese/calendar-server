import {
    Entity, PrimaryGeneratedColumn, Column,
    CreateDateColumn, UpdateDateColumn, ManyToOne
  } from 'typeorm';
  import { User } from './User';
  
  @Entity('events')
  export class Event {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Column()
    name!: string;
  
    @Column()
    description!: string;
  
    @Column()
    event_date!: Date;
  
    @Column({ default: false })
    is_deleted!: boolean;
  
    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  
    @ManyToOne(() => User, user => user.events)
    user!: User;
  }
  