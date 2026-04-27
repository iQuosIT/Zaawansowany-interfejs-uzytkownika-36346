import { useState } from 'react';
import { Box, Typography, Button, Container, Drawer, List, ListItemButton, ListItemText, TextField } from '@mui/material';
import AppHeader from './AppHeader';
import ProjectCards from './ProjectCards';
import AddTaskModal from './AddTaskModal';
import TodoList from '../TodoList';
import { useTodoContext } from '../../context/TodoContext';

interface DashboardLayoutProps {
  onRegisterClick: () => void;
}

export default function DashboardLayout({ onRegisterClick }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Stany dla zadań i wyszukiwarki
  const { state, dispatch } = useTodoContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrowanie zadań na podstawie wyszukiwarki
  const filteredTodos = (state?.todos || []).filter(todo => 
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = (id: string) => dispatch({ type: 'TOGGLE', payload: id });
  const handleDelete = (id: string) => dispatch({ type: 'DELETE', payload: id });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <header>
        <AppHeader 
          handleDrawerToggle={handleDrawerToggle} 
          onRegisterClick={onRegisterClick} 
        />
      </header>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, bgcolor: 'background.paper' },
        }}
      >
        <nav aria-label="Menu mobilne">
          <List sx={{ pt: 2 }}>
            <ListItemButton onClick={handleDrawerToggle}><ListItemText primary="Dashboard" /></ListItemButton>
            <ListItemButton onClick={handleDrawerToggle}><ListItemText primary="Projekty" /></ListItemButton>
            <ListItemButton onClick={handleDrawerToggle}><ListItemText primary="Zadania" /></ListItemButton>
            <ListItemButton onClick={() => { handleDrawerToggle(); onRegisterClick(); }}>
              <ListItemText primary="Zarejestruj się" sx={{ color: 'primary.main' }} />
            </ListItemButton>
          </List>
        </nav>
      </Drawer>

      <Box component="main" id="main-content" sx={{ flexGrow: 1, py: { xs: 4, md: 8 } }}>
        <Container maxWidth="lg">
          
          {/* Sekcja Hero */}
          <section aria-labelledby="hero-title">
            <Box sx={{ mb: 8, maxWidth: '800px' }}>
              <Typography id="hero-title" variant="h3" component="h1" sx={{ fontWeight: 800, mb: 2 }}>
                Zarządzaj swoimi zadaniami jak profesjonalista
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400 }}>
                Nasza aplikacja ToDo pomoże Ci zorganizować każdy dzień, śledzić postępy i zwiększyć produktywność całego zespołu.
              </Typography>
              <Button variant="contained" size="large" onClick={onRegisterClick} sx={{ px: 4, py: 1.5, borderRadius: '8px' }}>
                Rozpocznij teraz
              </Button>
            </Box>
          </section>

          {/* Karty projektów */}
          <section aria-label="Karty projektów">
            <ProjectCards />
          </section>

          {/* NOWE: Sekcja zarządzania zadaniami */}
          <section aria-labelledby="tasks-heading" className="mt-12">
            <Box sx={{ 
              bgcolor: 'background.paper', 
              p: { xs: 3, md: 4 }, 
              borderRadius: 4,
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography id="tasks-heading" variant="h5" component="h2" sx={{ fontWeight: 700 }}>
                  Lista Zadań
                </Typography>
                
                {/* Przycisk otwierający Modal - test Focus Trapa */}
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => setIsModalOpen(true)}
                  aria-haspopup="dialog"
                >
                  + Dodaj zadanie
                </Button>
              </Box>

              {/* Formularz Wyszukiwania */}
              <Box component="search" sx={{ mb: 4 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Szukaj zadań..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  inputProps={{
                    'aria-label': 'Szukaj zadań po tytule'
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'background.default'
                    }
                  }}
                />
              </Box>

              {/* Wyświetlanie zadań */}
              <TodoList 
                todos={filteredTodos} 
                filter="all" 
                onToggle={handleToggle} 
                onDelete={handleDelete} 
              />
            </Box>
          </section>

        </Container>
      </Box>

      <Box component="footer" sx={{ py: 4, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <nav aria-label="Stopka">
             <Typography variant="body2" color="text.secondary">
               Regulamin | Polityka prywatności
             </Typography>
          </nav>
        </Container>
      </Box>

      {/* Komponent Modala */}
      <AddTaskModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </Box>
  );
}