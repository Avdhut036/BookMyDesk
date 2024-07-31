﻿// <auto-generated />
using System;
using BMDApplication.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BMDApplication.Migrations
{
    [DbContext(typeof(BMDDbContext))]
    [Migration("20240731094537_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("BMDApplication.Models.Booking", b =>
                {
                    b.Property<int>("BookingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("BookingId"));

                    b.Property<int>("BookedBy")
                        .HasColumnType("int");

                    b.Property<DateTime>("BookedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("BookedFloorNo")
                        .HasColumnType("int");

                    b.Property<int>("BookedFor")
                        .HasColumnType("int");

                    b.Property<int>("BookedSeatNo")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdateDate")
                        .HasColumnType("datetime(6)");

                    b.HasKey("BookingId");

                    b.HasIndex("BookedBy");

                    b.HasIndex("BookedSeatNo");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("BMDApplication.Models.Role", b =>
                {
                    b.Property<int>("RoleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("RoleId"));

                    b.Property<string>("RoleName")
                        .HasColumnType("longtext");

                    b.HasKey("RoleId");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("BMDApplication.Models.Seat", b =>
                {
                    b.Property<int>("SeatId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("SeatId"));

                    b.Property<string>("CurrentStatus")
                        .HasColumnType("longtext");

                    b.Property<int>("SeatFloor")
                        .HasColumnType("int");

                    b.Property<string>("SeatName")
                        .HasColumnType("longtext");

                    b.Property<string>("SeatType")
                        .HasColumnType("longtext");

                    b.HasKey("SeatId");

                    b.ToTable("Seats");
                });

            modelBuilder.Entity("BMDApplication.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("EmailId")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("PhoneNo")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("RoleFrequency")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("UserId");

                    b.HasIndex("RoleId");

                    b.ToTable("BMDUsers");
                });

            modelBuilder.Entity("BMDApplication.Models.Booking", b =>
                {
                    b.HasOne("BMDApplication.Models.User", "BookedByUser")
                        .WithMany("Bookings")
                        .HasForeignKey("BookedBy")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("BMDApplication.Models.Seat", "BookedSeat")
                        .WithMany("Bookings")
                        .HasForeignKey("BookedSeatNo")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("BookedByUser");

                    b.Navigation("BookedSeat");
                });

            modelBuilder.Entity("BMDApplication.Models.User", b =>
                {
                    b.HasOne("BMDApplication.Models.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("BMDApplication.Models.Role", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("BMDApplication.Models.Seat", b =>
                {
                    b.Navigation("Bookings");
                });

            modelBuilder.Entity("BMDApplication.Models.User", b =>
                {
                    b.Navigation("Bookings");
                });
#pragma warning restore 612, 618
        }
    }
}
