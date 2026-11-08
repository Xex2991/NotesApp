import React from "react";

function Landing({ setView }) {
    return(
        <div className="bg-light">
            <div className="container py-5">
                <div className="row align-items-center py-5">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <h1 className="display-3 fw-bold text-primery mb-3">NoteKeeper</h1>
                        <p className="lead fw-bold text-dark mb-3">Your thoughts, organized beatifully.</p>
                        <p className="text-muted fs-5 mb-4">
                            A simple, secure note-taking app that helps you capture ideas, organize your thoughts
                        </p>
                        <button
                            className="btn btn-primery btn-lg px-4 shadow-sm" 
                            onClick={() => setView('auth')}>
                                Get started <i className="fas fa-arrow-right ms-2"></i>
                        </button>
                    </div>
                    <div className="col-lg-6">
                        <div className="position-relative" style={{ height: "400px" }}>
                            {/* Note card 1 */}
                            <div 
                                className="position-absolute bg-white p-4 rounded-3 shadow-sm border"
                                style={{
                                width: "70%",
                                top: "40px",
                                left: "0",
                                transform: "rotate(-8deg)",
                                zIndex: 1,
                                transition: "all 0.3s ease"
                                }}
                                onMouseEnter={e => e.currentTarget.style.transform = "rotate(-8deg) translateY(-10px)"}
                                onMouseLeave={e => e.currentTarget.style.transform = "rotate(-8deg)"}>
                                    <div className="d-flex align-items-center mb-3 pb-2 border-bottom">
                                        <i className="fas fa-clipboard-list fs-4 text-primary me-2"></i>
                                        <h5 className="m-0 text-primary">Projects</h5>
                                    </div>
                                    <p className="mb-2"><i className="fas fa-circle text-primary me-2 fa-xs"></i>Mobile recipe app</p>
                                    <p className="mb-2"><i className="fas fa-circle text-primary me-2 fa-xs"></i>Smart home Dashboard</p>
                                    <p className="mb-2"><i className="fas fa-circle text-primary me-2 fa-xs"></i>Book club platform</p>
                                </div>
                            {/* Note card 2 */}
                            <div 
                                className="position-absolute bg-white p-4 rounded-3 shadow border"
                                style={{
                                width: "80%",
                                top: "80px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                zIndex: 3,
                                transition: "all 0.3s ease"
                                }}
                                onMouseEnter={e => e.currentTarget.style.transform = "translateX(-50p%) translateY(-10px)"}
                                onMouseLeave={e => e.currentTarget.style.transform = "translateX(-50p%)"}>
                                    <div className="d-flex align-items-center mb-3 pb-2 border-bottom">
                                        <i className="fas fa-tasks fs-4 text-primary me-2"></i>
                                        <h5 className="m-0 text-primary">Weekly Tasks</h5>
                                    </div>
                                    <p className="mb-2"><i className="fas fa-circle text-primary me-2 fa-xs"></i>Complete project proposal</p>
                                    <p className="mb-2"><i className="fas fa-circle text-primary me-2 fa-xs"></i>Team meating at 2 PM</p>
                                    <p className="mb-2"><i className="fas fa-circle text-primary me-2 fa-xs"></i>Review quarterly results</p>
                                </div>
                            {/* Note card 3 */}
                            <div 
                                className="position-absolute bg-white p-4 rounded-3 shadow-sm border"
                                style={{
                                width: "70%",
                                top: "30px",
                                left: "0",
                                transform: "rotate(8deg)",
                                zIndex: 2,
                                transition: "all 0.3s ease"
                                }}
                                onMouseEnter={e => e.currentTarget.style.transform = "rotate(8deg) translateY(-10px)"}
                                onMouseLeave={e => e.currentTarget.style.transform = "rotate(8deg)"}>
                                    <div className="d-flex align-items-center mb-3 pb-2 border-bottom">
                                        <i className="fas fa-book fs-4 text-primary me-2"></i>
                                        <h5 className="m-0 text-primary">Reading List</h5>
                                    </div>
                                    <p className="mb-2"><i className="fas fa-circle text-primary me-2 fa-xs"></i>Atomic Habits</p>
                                    <p className="mb-2"><i className="fas fa-circle text-primary me-2 fa-xs"></i>Deep Work</p>
                                    <p className="mb-2"><i className="fas fa-circle text-primary me-2 fa-xs"></i>The Psychology of Money</p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-5 position-relative mt-5 shadow-sm">
                <div className="container py-5">
                    <h2 className="display-5 fw-bold text-center text-primary mb-5 position-relative">
                        Why choose NoteKeeper?
                        <div className="position-absolute start-50 translate-middle-x" style={{height: "4px", width: "80px", backgroundColor: "#4169E1", bottom: "-15px", borderRadius: "2px" }}></div>
                    </h2>

                    <div className="row g-4 mt-3">
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm hover-card">
                                <div className="card-body text-center p-4">
                                    <div className="rounded-circle bg-primary bg-opacity-10 d-inline-flex p-3 mb-4">
                                        <i className="fas fa-lock fa-3x text-primary"></i>
                                    </div>
                                    <h3 className="h4 text-primary mb-3">Secure</h3>
                                    <p className="text-muted mb-0">Your notes are protected with enterprise-grade encrypton and secure authentication</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm hover-card">
                                <div className="card-body text-center p-4">
                                    <div className="rounded-circle bg-primary bg-opacity-10 d-inline-flex p-3 mb-4">
                                        <i className="fas fa-lock fa-3x text-primary"></i>
                                    </div>
                                    <h3 className="h4 text-primary mb-3">Lightning Fast</h3>
                                    <p className="text-muted mb-0">Instant syncing ensures your notes are always up-to-date across all your devices.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm hover-card">
                                <div className="card-body text-center p-4">
                                    <div className="rounded-circle bg-primary bg-opacity-10 d-inline-flex p-3 mb-4">
                                        <i className="fas fa-lock fa-3x text-primary"></i>
                                    </div>
                                    <h3 className="h4 text-primary mb-3">Beatifully Simple</h3>
                                    <p className="text-muted mb-0">Clean, intuitive interface lets you focus on your ideas without distractions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-primary text-white text-white text-center py-4">
                <p className="mb-0">&copy; {new Date().getFullYear()} NoteKeeper. All rights reserved</p>
                <p className="mb-0"> Created by Nurasyl</p>
            </footer>

            {/* Custom CSS  for card hover effect */}
            <style jsx="true">{`
            .hover-card {
            transition:transform 0.3s ease, box-shadow 0.3s ease;
            }
            .hover-card:hover {
                transform: translateY(-10px);
                box-shadow: 0 10px 30px rgba(65, 105, 225, 0.15) !important;
            }
            `}</style>
        </div>
    );
}

export default Landing;